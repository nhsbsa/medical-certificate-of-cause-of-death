const govukPrototypeKit = require('govuk-prototype-kit');
const addFilter = govukPrototypeKit.views.addFilter;

const dashboard = require('./dashboard');

//
// DEBUG DATA
//
addFilter('debugData', function(content) {

    // content: the session data object

    delete content.translations;

    return (this.ctx.data.debug === 'true') ? '<div class="govuk-grid-row"><div class="govuk-grid-column-two-thirds"><h2 class="govuk-heading-m govuk-!-margin-top-9">Session data</h2><textarea class="govuk-textarea">' + JSON.stringify(content) + '</textarea><p><a class="govuk-link" href="?debug=false">Remove</a></p></div></div>' : '';

});


//
// GET POSTCODE SEARCH SELECT
//
addFilter('getPostCodeSearchSelect', function( content, type ) {

    // content: the array of returned values
    // type: 'hospital' or 'another'

    let currentValue = this.ctx.data['select-'+type+'-address'];
    let html = '<select class="govuk-select" id="select-'+type+'-address" name="select-'+type+'-address">';

    html += ( currentValue ) ? '<option value="">Select address</option>' : '<option selected value="">Select address</option>';
    content.forEach(function( el ){
        html += ( currentValue === el ) ? '<option selected>'+el+'</option>' : '<option>'+el+'</option>';
    });

    
    return html;

});


//
// GET POSTCODE SEARCH STATUS
//
addFilter('getPostCodeSearchStatus', function(content, type) {

    // content: the array of returned values
    // type: 'hospital' or 'another'

    let status = ( type === 'hospital' ) ? this.ctx.data.translations.dpdHospitalPostcodeSelectResultDescription[this.ctx.data.lang] : this.ctx.data.translations.dpdOtherLocationPostcodeSelectResultDescription[this.ctx.data.lang];
   
    const noOfResults = ( Array.isArray( content ) ) ? content.length : 0;
    const postCode = ( this.ctx.data[type+'-postcode'] ) ? this.ctx.data[type+'-postcode'] : 'LS1 3EX';

    status = status.replace('[# results]', noOfResults);
    status = status.replace('[postcode]', postCode);

    if( noOfResults !== 1 ){
        status = status.replace('address', 'addresses');
        status = status.replace('cyfeiriad', 'cyfeiriadau');
    }
    
    // Add in the HTML link
    let searchAgain = ( type === 'hospital' ) ? this.ctx.data.translations.dpdHospitalPostcodeSearchAgainLink[this.ctx.data.lang] : this.ctx.data.translations.dpdOtherLocationPostcodeSearchAgainLink[this.ctx.data.lang];
    let url = ( type === 'hospital' ) ? 'hospital-postcode' : 'another-location-postcode';
    status = status.replace( searchAgain, '<a href="'+url+'">'+searchAgain+'</a>');

    return status;

});


//
// GET FOOTER STATUS
//
addFilter('getFooterStatus', function(content) {

    // content: blank string

    let roleType;
    switch( this.ctx.data['role-type'] ){
        case 'me':
            roleType = 'as a medical examiner (ME)';
            break;
        case 'meo':
            roleType = 'as a medical examiner officer (MEO)';
            break;
        case 'ap':
            roleType = 'as an attending practitioner (AP)';
            break;
        default: 
            roleType = 'as an unknown person';
            break;
    }

    let path;
    switch( this.ctx.data['over-under-28'] ) {
        case 'dpd66Or65RadioYes':
            path = 'on an infant MCCD path';
            break;
        case 'dpd66Or65RadioNo':
            path = 'on an adult MCCD path';
            break;
        default:
            path = 'on an undetermined MCCD path'
            break;
    }

    let lang = ( this.ctx.data.lang === 'en' ) ? '(in English)' : '(in Welsh)';

    return 'Currently acting ' + roleType + ' ' + path + ' ' + lang;

});



//
// GET TRANSLATION TABLE ROWS
//
addFilter('getTranslationTableRows', function(content) {

    // content: the translations variable

    const rows = [];

    if( content.constructor === Object ){

        Object.keys(content).forEach(function(key){
            let item = content[key];
            rows.push( [ { html:'<input style="width:300px;font-size: 0.6em;" class="govuk-input" type="text" value="data.translations.'+key+'[data.lang]" />' }, {text:item.en}, {text:item.cy} ] );
        });

    }

    return rows;

});






//
// GET STATUS FILTER OPTIONS
//
addFilter( 'getStatusFilterOptions', function( content ){

    // content: statusFilter variable
    content = ( content ) ? content : '';

    const statuses = ['For officer review','To be amended','Amended','For sign off by medical examiner','Review complete - send to registrar','Sent to registrar'];

    let html = '<option value="">Show all statuses</option>';
    statuses.forEach(function( status ){

        // Add a unique value for ME
        if( status === 'For sign off by medical examiner' ){
            html += ( content === status ) ? '<option selected value="For sign off by medical examiner">' : '<option value="For sign off by medical examiner">';
            html += 'For sign off by ME</option>';
        } else if( status === 'Review complete - send to registrar' ){
            html += ( content === status ) ? '<option selected value="Review complete - send to registrar">' : '<option value="Review complete - send to registrar">';
            html += 'Send to registrar</option>';
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

    const rowsPerPage = ( Number.isInteger( parseInt(this.ctx.data.rowsPerPage) ) ) ? parseInt(this.ctx.data.rowsPerPage) : 10;
    const currentPage = ( Number.isInteger( parseInt(this.ctx.data.currentPage) ) ) ? parseInt(this.ctx.data.currentPage) : 0;

    const searchTerm = ( this.ctx.data.searchTerm && this.ctx.data.searchTerm.trim().length > 2 ) ? this.ctx.data.searchTerm.trim() : '';
    const statusFilter = ( this.ctx.data.statusFilter ) ? this.ctx.data.statusFilter : '';
    const sortBy = ( this.ctx.data.sortBy ) ? this.ctx.data.sortBy : '';

    // Perform the filtering, search term first, then status filters, then orders by date...
    let rows = dashboard.getFilteredResults( content, searchTerm, statusFilter, sortBy );
    this.ctx.data.noOfFilteredRows = rows.length;

    rows = dashboard.getPaginatedResults( rows, rowsPerPage, currentPage );

    // If rows is empty, display an error message
    if( rows.length === 0 ){
        rows.push( [{ html:'<span class="govuk-body">No certificates found</span>', colspan: 5}] );
    }
    
   return rows;

});

//
// GET DASHBOARD PAGINATION LINKS FUNCTION
//
addFilter( 'getDashboardPaginationLinks', function( content ){

    // content: blank string

    const rowsPerPage = ( Number.isInteger( parseInt(this.ctx.data.rowsPerPage) ) ) ? parseInt(this.ctx.data.rowsPerPage) : 10;
    const currentPage = ( Number.isInteger( parseInt(this.ctx.data.currentPage) ) ) ? parseInt(this.ctx.data.currentPage) : 0;
    
    const searchTerm = ( this.ctx.data.searchTerm && this.ctx.data.searchTerm.trim().length > 2 ) ? this.ctx.data.searchTerm.trim() : '';
    const statusFilter = ( this.ctx.data.statusFilter ) ? this.ctx.data.statusFilter : '';
    const sortBy = ( this.ctx.data.sortBy ) ? this.ctx.data.sortBy : '';
    
    const noOfFilteredRows = ( Number.isInteger(this.ctx.data.noOfFilteredRows) ) ? this.ctx.data.noOfFilteredRows : 0;
    const noOfPages = Math.ceil( noOfFilteredRows / rowsPerPage );

    let obj = {};

    if( noOfFilteredRows > rowsPerPage ){

        if( currentPage !== 0 ){
            obj.previous = { 'href' : '?currentPage='+(currentPage-1) }
        }
        if( currentPage !== ( noOfPages - 1 ) ){
            obj.next = { 'href' : '?currentPage='+(currentPage+1) }
        }

        obj.items = [];
        for( let i = 0; i < noOfPages; i++ ){

            let itemObj = {'number': (i+1), 'href':'?currentPage='+i };
            if( i === currentPage ){
                itemObj.current = true;
            }

            obj.items.push( itemObj );
        }

    }

    return obj;

} );