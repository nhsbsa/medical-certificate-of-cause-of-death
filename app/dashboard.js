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

    console.log('Looking for: ' + statusFilter);

    let arr = [];
    rows.forEach(function( row ){
        if( row[4].html.indexOf(statusFilter) > -1 ){
            arr.push( row);
        }
    });

    return arr;

}

//
// FILTER BY DATE FUNCTION
//
function _filterByDate( rows ){

    let arr = Array.from(rows);
    arr.sort(function( a, b ){

        let dateA = a[2].text;
        let dateB = b[2].text;
        
        let check = 0;
        
        if( dateA < dateB ){
            check = -1;
        }
        if( dateA > dateB ){
            check = 1;
        }

        return check;

    });

    console.log( arr );

    return arr;

}


//
// GET TAG FOR STATUS FUNCTION
//
function _getTagForStatus( status ){

    const statuses = [ 
        '<span class="govuk-tag govuk-tag--blue">For officer review</span>',
        '<span class="govuk-tag govuk-tag--orange">To be amended</span>',
        '<span class="govuk-tag govuk-tag--yellow">Amended</span>',
        '<span class="govuk-tag govuk-tag--green">For sign off by medical examiner</span>',
        '<span class="govuk-tag govuk-tag--purple">Ready to share</span>',
        '<span class="govuk-tag">Shared</span>'
    ];

    let html = '';
    const loop = statuses.length;
    for( let i = 0; i < loop; i++ ){
        if( statuses[i].indexOf(status) > -1 ){
            html = statuses[i];
            break;
        }
    }

    return html;

};

//
// GET ACTION FOR STATUS FUNCTION
//
function _getActionForStatus( status ){

    let html = '';

    switch ( status ){
    
        case 'For officer review':
        case 'To be amended':
            html = '<a class="govuk-link" href="">Review</a>';
            break;

        case 'Ready to share':
            html = '<a class="govuk-link" href="">Download</a>';
            break;

        case 'Amended':
        case 'For sign off by medical examiner':
        case 'Shared':
            html = '<a class="govuk-link" href="">View</a>';
            break;

    }

    return html;
};


//
// GET ROW FUNCTION
//
function _getRow( patient ){

    let arr = [];

    arr.push( { html: patient.name + '<br /><span class="govuk-body-s govuk"><span class="govuk-visually-hidden">NHS number: </span>' + patient.nhsNo + '</span>' } );
    arr.push( { html: patient.placeOfDeath } );
    arr.push( { text: patient.dateOfDeath } );
    arr.push( { html: _getActionForStatus( patient.status ) } );
    arr.push( { html: _getTagForStatus( patient.status ) });

    return arr;

}

//
// EXPORT EVERYTHING
//
module.exports = {
    filterBySearchTerm: _filterBySearchTerm,
    filterByDate: _filterByDate,
    filterByStatus: _filterByStatus
}