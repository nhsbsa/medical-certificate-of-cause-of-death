const govukPrototypeKit = require('govuk-prototype-kit');
const addFilter = govukPrototypeKit.views.addFilter;

//
// DEBUG DATA
//
addFilter('debugData', function(content) {

    // content: the session data object

    return (this.ctx.data.debug === 'true') ? '<div class="govuk-grid-row"><div class="govuk-grid-column-two-thirds"><h2 class="govuk-heading-m govuk-!-margin-top-9">Session data</h2><textarea class="govuk-textarea">' + JSON.stringify(content) + '</textarea><p><a class="govuk-link" href="?debug=false">Remove</a></p></div></div>' : '';

});

//
// GENERATE DASHBOARD CAPTION
//
addFilter( 'getDashboardCaption', function( content ){
    
    // content: blank string

    const searchTerm = ( this.ctx.data.searchTerm && this.ctx.data.searchTerm.trim().length > 2 ) ? this.ctx.data.searchTerm.trim() : '';
    const caption = ( searchTerm ) ? 'Certificates for "'+searchTerm+'"' : 'All certificates';

    return caption;

});


//
// GET DASHBOARD TABLE ROWS
//
addFilter('getDashboardTableRows', function( content ) {
   
    // content: patient data from 'tests/data-patients.html'

    const noOfRows = ( Number.isInteger( parseInt(this.ctx.data.rowsPerPage) ) ) ? parseInt(this.ctx.data.rowsPerPage) : 10;
    const searchTerm = ( this.ctx.data.searchTerm && this.ctx.data.searchTerm.trim().length > 2 ) ? this.ctx.data.searchTerm.trim() : '';

    // Just randomnly grabs one for now
    const statuses = [ 
        '<span class="govuk-tag govuk-tag--blue">For officer review</span>',
        '<span class="govuk-tag govuk-tag--orange">To be amended</span>',
        '<span class="govuk-tag govuk-tag--green">For sign-off by Medical Examiner</span>',
        '<span class="govuk-tag govuk-tag--purple">Ready to share</span>',
        '<span class="govuk-tag">Shared</span>'
    ];

    // Repeat this 
    const _getRow = function( patient ){

        let arr = [];

        arr.push( { html: patient.name + '<br /><span class="govuk-body-s govuk"><span class="govuk-visually-hidden">NHS number: </span>' + patient.nhsNo + '</span>' } );
        arr.push( { html: patient.placeOfDeath } );
        arr.push( { text: patient.dateOfDeath } );
        arr.push( { html: '<a href="#">View</a>' } ); // Temp
        arr.push( { html: statuses[Math.round(Math.random()*(statuses.length-1))] } ); // Temp

        return arr;

    };

    // Filter the content
    const _filterContentBySearchTerm = function( content, searchTerm ) {

        const rows = [];
        const noOfRecords = ( Array.isArray( content ) && content.length > 0 ) ? content.length : 0;

        for( let i = 0; i < noOfRecords; i++ ){

            let patient = content[i];

            if (searchTerm) {

                const regex = /^[0-9\s]+$/;

                if (regex.test(searchTerm)) {

                    // NHS Number (only push if it matches)
                    const spaceLessSearchTerm = searchTerm.split(' ').join('');
                    if (patient.nhsNo.split(' ').join('') === spaceLessSearchTerm) {
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

    };


    // Perform the filtering
    let rows = _filterContentBySearchTerm( content, searchTerm );

    // Truncate if over the noOfRows
    if( rows.length > noOfRows ){
        rows = rows.slice( 0, noOfRows );
    }

    // If rows is empty, display an error message
    if( rows.length === 0 ){
        rows.push( [{ html:'<span class="govuk-body">No certificates found</span>', colspan: 5}] );
    }

    
   return rows;

});