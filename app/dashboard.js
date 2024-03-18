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

    let arr = [];
    rows.forEach(function( row ){

        if( statusFilter ){
            if( row[row.length-1].html.indexOf(statusFilter) > -1 ){
                arr.push( row );
            }
        } else {
            arr.push( row );
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
// GET TAG FOR STATUS FUNCTION
//
function _getTagForStatus( status ){

    status = parseInt( status );

    const statuses = [ 
        '<span class="govuk-tag govuk-tag--blue">For officer review</span>',
        '<span class="govuk-tag govuk-tag--orange">To be amended</span>',
        '<span class="govuk-tag govuk-tag--yellow">Amended</span>',
        '<span class="govuk-tag govuk-tag--green">For sign off by medical examiner</span>',
        '<span class="govuk-tag govuk-tag--purple">Review complete - send to registrar</span>',
        '<span class="govuk-tag">Sent to registrar</span>'
    ];

    return statuses[status];

};

//
// GET ACTION FOR STATUS FUNCTION
//
function _getActionForStatus( status ){

    status = parseInt( status );

    let html = '';
    switch ( status ){
    
        case 'For officer review':
        case 0:
            html = '<a class="govuk-link" href="../tests/meo-mccd?statusFilter=For%20officer%20review">Review certificate</a>';
            break;

        case 'To be amended':
        case 1:
            html = '<a class="govuk-link" href="../tests/meo-mccd?statusFilter=To%20be%20amended">View certificate</a>';
            break;

        case 'Review complete - send to registrar':
        case 2:
            html = '<a class="govuk-link" href="../tests/meo-mccd?statusFilter=Review%20complete%20-%20send%20to%20registrar">Download certificate</a>';
            break;

        case 'Amended':
        case 3:
            html = '<a class="govuk-link" href="../tests/meo-mccd?statusFilter=Amended">Review certificate</a>';
            break;

        case 'For sign off by medical examiner':
        case 4:
            html = '<a class="govuk-link" href="../tests/meo-mccd?statusFilter=For%20sign%20off%20by%20medical%20examiner">View certificate</a>';
            break;

        case 'Sent to registrar':
        case 5:
            html = '<a class="govuk-link" href="../tests/meo-mccd?statusFilter=Sent%20to%20registrar">View certificate</a>';
            break;

    }

    return html;
};


//
// GET ROW FUNCTION
//
function _getRow( patient ){

    let arr = [];

    arr.push( { text: patient.name, html: patient.name + '<br /><span class="govuk-body-s govuk"><span class="govuk-visually-hidden">NHS number: </span>' + patient.nhsNo + '</span>' } );
    arr.push( { text: patient.dateOfDeath } );
    arr.push( { html: _getActionForStatus( patient.status ) } );
    arr.push( { text: patient.status, html: _getTagForStatus( patient.status ) });

    return arr;

}

//
// GET FILTERED RESULTS FUNCTION
//
function _getFilteredResults( rows, searchTerm, statusFilter, sortBy, sortDirection ){

    let filteredRows = _filterBySortBy( _filterByStatus( _filterBySearchTerm( rows, searchTerm ), statusFilter ), sortBy, sortDirection );
    
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
    getPaginatedResults: _getPaginatedResults
}