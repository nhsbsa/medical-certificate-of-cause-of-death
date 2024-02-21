const govukPrototypeKit = require('govuk-prototype-kit');
const addFilter = govukPrototypeKit.views.addFilter;

//
// DEBUG DATA
//
addFilter('debugData', function(content) {
    // content: the session data object
    return (this.ctx.data.debug === 'true') ? '<div class="govuk-grid-row"><div class="govuk-grid-column-two-thirds"><h2 class="govuk-heading-m govuk-!-margin-top-9">Debugging information</h2><textarea class="govuk-textarea">' + JSON.stringify(content) + '</textarea><p><a class="govuk-link" href="?debug=false">Remove</a></p></div></div>' : '';
});

//
// TEST DATA FUNCTION
//
addFilter('testData', function(content) {

    console.log(this);
    return '<textarea>'+JSON.stringify(content)+'</textarea>';

});


//
// GENERATE DASHBOARD TABLE ROWS
//
addFilter('generateDashboardTableRows', function( content, noOfRows ) {
   
    // content: patient data from 'tests/data-patients.html'
    // noOfRows: the number of rows to draw

    noOfRows = ( Number.isInteger(parseInt(noOfRows)) ) ? parseInt(noOfRows) : 10;

    // Just randomnly grabs one for now
    const statuses = [ 
        '<span class="govuk-tag govuk-tag--blue">For officer review</span>',
        '<span class="govuk-tag govuk-tag--orange">To be amended</span>',
        '<span class="govuk-tag govuk-tag--green">For sign-off by Medical Examiner</span>',
        '<span class="govuk-tag govuk-tag--purple">Ready to share</span>',
        '<span class="govuk-tag">Shared</span>'
    ];

    const rows = [];

    for( let i = 0; i < noOfRows; i++ ){

        let patient = content[i];

        if( patient ){
        
            let arr = [];

            arr.push( { html: patient.name + '<br /><span class="govuk-body-s govuk"><span class="govuk-visually-hidden">NHS number: </span>' + patient.nhsNo + '</span>' } );
            arr.push( { html: patient.placeOfDeath } );
            arr.push( { text: patient.dateOfDeath } );
            arr.push( { html: '<a href="#">View</a>' } ); // Temp
            arr.push( { html: statuses[Math.round(Math.random()*(statuses.length-1))] } ); // Temp

            rows.push(arr);

        } else {
            break;
        }
    }
    
   return rows;

});