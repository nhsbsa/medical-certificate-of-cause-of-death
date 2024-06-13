//
// INTERNAL VARIABLES

const { separateDraftsTable } = require("./data/session-data-defaults");

//
const _debug = false;
let _roleType = '';

//
// GET STATUSES FUNCTION
// Now all calls for statuses come via here - should make updating stuff easier...
//
function _getStatuses( num, returnType ){

    // num: a number to return, else return everything
    // returnType: string - either 'statuses', 'tags' or 'explanations'

    const returnTypes = ['statuses','tags','explanations'];
    returnType = ( returnTypes.indexOf(returnType) > -1 ) ? returnType : 'statuses';

    num = parseInt(num);

    /* 

    PREVIOUS VERSION

    const statuses = [
        'For officer review',
        'To be amended',
        'Amended',
        'For sign off by medical examiner',
        'Review complete - send to registrar',
        'Submitted to registrar'
    ];

    const tags = [ 
        '<span class="govuk-tag govuk-tag--blue">For officer review</span>',
        '<span class="govuk-tag govuk-tag--orange">To be amended</span>',
        '<span class="govuk-tag govuk-tag--yellow">Amended</span>',
        '<span class="govuk-tag govuk-tag--green">For sign off by medical examiner</span>',
        '<span class="govuk-tag govuk-tag--purple">Review complete - send to registrar</span>',
        '<span class="govuk-tag">Submitted to registrar</span>'
    ];
    */

    const values = {};

    values.statuses = [
        'Draft',
        'For review by MEO',
        'To be amended',
        'For sign off by medical examiner',
        'Review complete - send to registrar',
        'Submitted to registrar'
    ];

    values.tags = [ 
        '<span class="govuk-tag govuk-tag--grey">Draft</span>',
        '<span class="govuk-tag govuk-tag--blue">For review by MEO</span>',
        '<span class="govuk-tag govuk-tag--orange">To be amended</span>',
        '<span class="govuk-tag govuk-tag--green">For sign off by medical examiner</span>',
        '<span class="govuk-tag govuk-tag--purple">Review complete - send to registrar</span>',
        '<span class="govuk-tag">Submitted to registrar</span>'
    ];

    values.explanations = [
        'The MCCD has not been submitted.',
        'An AP has submitted the MCCD and it has been passed to a medical examiner office for review by an MEO.',
        'A ME has reviewed the MCCD and requires the AP to make changes.',
        'The MCCD requires scrutiny from an ME.',
        'The MCCD is ready to be sent to the register office by an MEO.',
        'The MCCD has been sent to the register office.'
    ];

    return ( Number.isNaN(num) ) ? values[returnType] : values[returnType][num];

}


//
// FILTER BY SEARCH TERM FUNCTION
//
function _filterBySearchTerm( content, searchTerm ) {

    const rows = [];
    const noOfRecords = ( Array.isArray( content ) && content.length > 0 ) ? content.length : 0;

    for( let i = 0; i < noOfRecords; i++ ){

        let patient = content[i];

        if (searchTerm) {

            const regex = /^[0-9\s]+$/;

            if (regex.test(searchTerm)) {

                // NHS Number (only push if it matches, or is the first few digits...)
                const spaceLessSearchTerm = searchTerm.split(' ').join('');
                if (patient.nhsNo.split(' ').join('').indexOf(spaceLessSearchTerm) === 0 ) {
                    rows.push(_getRow(patient));
                }

            } else {

                // Name (allows partial matches)
                const lowerCaseSearchTerm = searchTerm.toLowerCase();

                if (patient.name.toLowerCase().indexOf(lowerCaseSearchTerm) > -1) {
                    rows.push(_getRow(patient));
                }

            }

        } else {

            // No searchTerm
            rows.push(_getRow(patient));

        }


    }

    if( _debug ){
        console.log( '_filterBySearchTerm(); Rows remaining: ' + rows.length );
    }

    return rows;

}

//
// FILTER BY STATUS FUNCTION
//
function _filterByStatus( rows, statusFilter ) {

    statusFilter = parseInt( statusFilter );

    const arr = [];

    rows.forEach(function( row ){

        if( Number.isNaN(statusFilter) ){
            arr.push( row );
        } else {
            if( parseInt(row[row.length-1].text) === statusFilter ){
                arr.push( row );
            }
        }

        
    });

    if( _debug ){
        console.log( '_filterByStatus(); Rows remaining: ' + rows.length );
    }

    return arr;

}

//
// FILTER BY SORT BY FUNCTION
//
function _filterBySortBy( rows, sortType, sortDirection ){

    let num = 1; // date
    switch( sortType ){
        case 'name':
            num = 0;
            break;
        case 'status':
            num = 3;
            break;
    }


    let arr = Array.from(rows);
    arr.sort(function( a, b ){

        let dateA = a[num].text;
        let dateB = b[num].text;

        if( sortType === 'status' ){
            dateA = parseInt(dateA);
            dateB = parseInt(dateB);
        }
        
        let check = 0;
        
        if( dateA < dateB ){
            check = -1;
        }
        if( dateA > dateB ){
            check = 1;
        }

        return check;

    });

    if( sortDirection === 'descending' ){
        arr = arr.reverse();
    }

    if( _debug ){
        console.log( '_filterBySortBy(); Rows remaining: ' + arr.length );
    }

    return arr;

}

//
// FILTER BY ROLE TYPE FUNCTION 
//
function _filterByRoleType( rows, roleType ){

    let filterByRoleType = true; // You can toggle to switch this on/off

    let arr = rows;

    if( filterByRoleType ){

            arr = [];

            rows.forEach(function( row ){

                switch( roleType ){

                    case 'ap':

                        // AP - filter for those patients with the "belongs to AP" flag (just used for demo)
                        if( row.belongsToAP ){
                            arr.push(row);
                        } 
                        break;

                    case 'me':

                        // ME - filter for those patients with the "belongs to AP" flag (just used for demo)
                        if( row.status === 3 || row.belongsToME ){

                            // MEs would never go round the AP-ME approval loop
                            if( row.status !== 1 && row.status !== 2 ){
                                arr.push(row);
                            }
                            
                        }
                        break;

                    case 'meo':

                        // MEO - basically anything except drafts
                        if( row.status !== 0 ){
                            arr.push(row);
                        }
                        break;

                }

                
            });

    }

    if( _debug ){
        console.log( '_filterByRoleType(); Rows remaining: ' + arr.length );
    }
    

    return arr;

}

//
// GET ACTION FOR STATUS FUNCTION
//
function _getActionForStatus( status, id ){

    status = parseInt( status );

    

    const actions = {
        ap: ['Finish certificate','View certificate','Amend certificate','View certificate','View certificate','View certificate'],
        me: ['Finish certificate','XXX certificate','XXX certificate','Review certificate','View certificate','View certificate'],
        meo: ['XXX certificate','Review certificate','View certificate','View certificate','Download certificate','View certificate']
    }

    const useAliases = true;
    let link = 'mccd-summary?id='+id;

    let html = '';

    switch ( status ){
    
        // Draft
        case 0:
            html = '<a class="govuk-link" href="mccd-tasklist">'+actions[_roleType][status]+'</a>';
            break;

        default: 
            if( useAliases ){
                link = actions[_roleType][status].toLowerCase().split(' ').join('-') + '?id='+id;
            }
            html = '<a class="govuk-link" href="'+link+'">'+actions[_roleType][status]+'</a>';
            break;

    }

    return html;
};


//
// GET ROW FUNCTION
//
function _getRow( patient ){

    let arr = [];

    arr.push( { text: patient.lastNameFirst, html: patient.lastNameFirst + '<br /><span class="govuk-body-s govuk"><span class="govuk-visually-hidden">NHS number: </span>' + patient.nhsNo + '</span>' } );
    arr.push( { text: patient.dateOfDeath } );
    arr.push( { html: _getActionForStatus( patient.status, patient.id ) } );
    arr.push( { text: patient.status, html: _getStatuses( patient.status, 'tags' ) });

    return arr;

}

//
// OVERRIDE ROWS FOR TESTING FUNCTION
//
function _overrideRowsForTesting( rows, meSignOff, meoReview, sentToRegistrar, lastName ){

    let overrideRows = true;
    let lastNameString = lastName || '';

    if( _debug ){
        console.log( '_overrideRowsForTesting(); Rows remaining: ' + rows.length );
    }

    let arr = ( overrideRows ) ? [] : rows;

    if( overrideRows ){
        rows.forEach(function( row ){

            // This code only allows the specified accounts in if the correct surname is entered...
            if( row.id === 'XKSUPOF6O7-24' ){
                if( lastNameString.trim().toLowerCase() === 'smith' ){
                    arr.push( row );
                }
            } else if( row.id === 'GYRMYSJB7-24' ){
                if( lastNameString.trim().toLowerCase() === 'fletcher' ){
                    arr.push( row );
                }
            } else if( row.id === 'DGGHM7VSQ-24' ){
                /*
                if( lastNameString.trim().toLowerCase() === 'jones' ){
                    arr.push( row );
                }
                */
            } else {
                arr.push( row );
            }
            

        });
    }


    return arr;

}

//
// FILTER DRAFTS FUNCTION
//
function _filterDrafts( rows, filterDrafts ){

    const arr = ( filterDrafts ) ? [] : rows;
    
    if( filterDrafts ){

        rows.forEach(function( row ){
            if( row.status !== 0 ){
                arr.push(row);
            }
        });

    }

    return arr;

}

//
// GET FILTERED RESULTS FUNCTION
//
function _getFilteredResults( rows, roleType, searchTerm, statusFilter, sortBy, sortDirection, meSignOff, meoReview, sentToRegistrar, filterDrafts, lastName ){

    if( _debug ){
        console.log( 'START FILTERING ----------------' ); 
    }

    _roleType = roleType;

    const filteredRows = _filterBySortBy( _filterByStatus( _filterBySearchTerm( _filterByRoleType( _overrideRowsForTesting( _filterDrafts( rows, filterDrafts ), meSignOff, meoReview, sentToRegistrar, lastName ), roleType ), searchTerm ), statusFilter ), sortBy, sortDirection );

    if( _debug ){
        console.log( 'END FILTERING ----------------' );
    }

    return filteredRows;

}

//
// GET PAGINATED RESULTS FUNCTION
//
function _getPaginatedResults( rows, rowsPerPage, currentPage ) {

    let paginatedRows = [];

    if( rows.length > rowsPerPage ){

        let start = currentPage*rowsPerPage;
        let end = start + rowsPerPage;

        paginatedRows = rows.slice( start, end );

    } else {

        paginatedRows = rows;

    }

    return paginatedRows;

}

//
// GET DRAFT RESULTS FUNCTION
//
function _getDraftResults( rows, roleType ){

    const arr = [];

    _roleType = roleType;

    rows.forEach(function( row ){
        if( row.status === 0 ){
            if( roleType === 'me' && !row.belongsToAP ){
                arr.push( _getRow(row) );
            } else if( roleType === 'ap' && row.belongsToAP ) {
                arr.push( _getRow(row) );
            }
        }
    });

    return arr;

}


//
// EXPORT EVERYTHING
//
module.exports = {
    getDraftResults: _getDraftResults,
    getFilteredResults: _getFilteredResults,
    getPaginatedResults: _getPaginatedResults,
    getStatuses: _getStatuses
}