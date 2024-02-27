const govukPrototypeKit = require('govuk-prototype-kit');
const addFilter = govukPrototypeKit.views.addFilter;

const dashboard = require('./dashboard');

//
// DEBUG DATA
//
addFilter('debugData', function(content) {

    // content: the session data object

    return (this.ctx.data.debug === 'true') ? '<div class="govuk-grid-row"><div class="govuk-grid-column-two-thirds"><h2 class="govuk-heading-m govuk-!-margin-top-9">Session data</h2><textarea class="govuk-textarea">' + JSON.stringify(content) + '</textarea><p><a class="govuk-link" href="?debug=false">Remove</a></p></div></div>' : '';

});

//
// GET STATUS FILTER OPTIONS
//
addFilter( 'getStatusFilterOptions', function( content ){

    // content: statusFilter variable

    const statuses = ['For officer review','To be amended','Amended','For sign off by medical examiner','Ready to share','Shared'];

    let html = '<option value="">Show all statuses</option>';
    statuses.forEach(function( status ){

        // Add a unique value for ME
        if( status === 'For sign off by medical examiner' ){
            html += ( content === status ) ? '<option selected value="For sign off by medical examiner">' : '<option value="For sign off by medical examiner">';
            html += 'For sign off by ME</option>';
        } else {
            html += ( content === status ) ? '<option selected>' : '<option>';
            html += status + '</option>';
        }

    });

    return html;

} );

//
// GENERATE DASHBOARD CAPTION
//
addFilter( 'getDashboardCaption', function( content ){
    
    // content: blank string

    const searchTerm = ( this.ctx.data.searchTerm && this.ctx.data.searchTerm.trim().length > 2 ) ? this.ctx.data.searchTerm.trim() : '';
    const statusFilter = ( this.ctx.data.statusFilter ) ? this.ctx.data.statusFilter : '';

    let caption = 'All certificates';

    const regex = /^[0-9\s]+$/;
    const isNHSNumber = regex.test(searchTerm);
    const spaceLessSearchTerm = searchTerm.split(' ').join('');

    if( searchTerm ){

        if( isNHSNumber ){
            if( spaceLessSearchTerm.length === 10 ){
                caption = 'Certificates with NHS number "'+searchTerm+'"';
            } else {
                caption = 'Certificates with NHS number beginning with "'+searchTerm+'"';
            }
        } else {
            caption = 'Certificates containing "'+searchTerm+'"';
        }

    }

    if( statusFilter ){
        caption += ' with status "' + statusFilter + '"';
    }

    return caption;

});

//
// GET DASHBOARD TABLE ROWS
//
addFilter( 'getDashboardTableRows', function( content ) {
   
    // content: patient data from 'tests/data-patients.html'

    const noOfRows = ( Number.isInteger( parseInt(this.ctx.data.rowsPerPage) ) ) ? parseInt(this.ctx.data.rowsPerPage) : 10;
    const searchTerm = ( this.ctx.data.searchTerm && this.ctx.data.searchTerm.trim().length > 2 ) ? this.ctx.data.searchTerm.trim() : '';
    const statusFilter = ( this.ctx.data.statusFilter ) ? this.ctx.data.statusFilter : '';
    const sortBy = ( this.ctx.data.sortBy ) ? this.ctx.data.sortBy : '';

    // Perform the filtering, search term first, then status filters, then orders by date...
    let rows = dashboard.getFilteredResults( content, searchTerm, statusFilter, sortBy );

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