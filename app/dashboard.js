
//
// GET STATUSES FUNCTION
// Now all calls for statuses come via here - should make updating stuff easier...
//
function _getStatuses( num, returnTag ){

    // num: a number to return, else return everything
    // returnTag: boolean, whether to return the status(es) or tag(s)

    num = parseInt(num);

    const statuses = [
        'For officer review',
        'To be amended',
        'Amended',
        'For sign off by medical examiner',
        'Review complete - send to registrar',
        'Sent to registrar'
    ];

    const tags = [ 
        '<span class="govuk-tag govuk-tag--blue">For officer review</span>',
        '<span class="govuk-tag govuk-tag--orange">To be amended</span>',
        '<span class="govuk-tag govuk-tag--yellow">Amended</span>',
        '<span class="govuk-tag govuk-tag--green">For sign off by medical examiner</span>',
        '<span class="govuk-tag govuk-tag--purple">Review complete - send to registrar</span>',
        '<span class="govuk-tag">Sent to registrar</span>'
    ];

    const arr = ( returnTag ) ? tags : statuses;

    return ( Number.isNaN(num) ) ? arr : arr[num];

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

    // Only date ATM...
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

    

    return arr;

}

//
// FILTER BY ROLE TYPE FUNCTION 
//
function _filterByRoleType( rows, roleType ){

    let filterByRoleType = true; // You can toggle to switch this on/off

    let arr = rows;

    if( filterByRoleType ){

        if(roleType === 'ap' | roleType === 'me' ){

            arr = [];

            rows.forEach(function( row ){

                if( roleType === 'ap' ){
                    // AP - filter for those patients with the "belongs to AP" flag (just used for demo)
                    if( row.belongsToAP ){
                        arr.push(row);
                    }

                } else {
                    // ME - for the demo, only show ones that require
                    if( row.status === 3 ){
                        arr.push(row);
                    }
                    
                }

                
            });

        } 
    }
    

    return arr;

}

//
// GET ACTION FOR STATUS FUNCTION
//
function _getActionForStatus( status, id ){

    status = parseInt( status );

    let link = '../tests/mccd-summary?id='+id;

    let html = '';

    switch ( status ){
    
        // For officer review
        case 0:
            html = '<a class="govuk-link" href="'+link+'">Review certificate</a>';
            break;

        // To be amended
        case 1:
            html = '<a class="govuk-link" href="'+link+'">View certificate</a>';
            break;
        
        // Amended
        case 2:
            html = '<a class="govuk-link" href="'+link+'">Review certificate</a>';
            break;

        // For sign off by medical examiner
        case 3:
            html = '<a class="govuk-link" href="'+link+'">View certificate</a>';
            break;

        // Review complete - send to registrar
        case 4:
            html = '<a class="govuk-link" href="'+link+'">Download certificate</a>';
            break;

        // Sent to registrar
        case 5:
            html = '<a class="govuk-link" href="'+link+'">View certificate</a>';
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
    arr.push( { text: patient.status, html: _getStatuses( patient.status, true ) });

    return arr;

}

//
// GET FILTERED RESULTS FUNCTION
//
function _getFilteredResults( rows, roleType, searchTerm, statusFilter, sortBy, sortDirection ){

    let filteredRows = _filterBySortBy( _filterByStatus( _filterBySearchTerm( _filterByRoleType( rows, roleType ), searchTerm ), statusFilter ), sortBy, sortDirection );
    
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
// EXPORT EVERYTHING
//
module.exports = {
    getFilteredResults: _getFilteredResults,
    getPaginatedResults: _getPaginatedResults,
    getStatuses: _getStatuses
}