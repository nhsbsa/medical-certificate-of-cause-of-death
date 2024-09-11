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
// GET FEEDBACK LINK
//
addFilter('getFeedbackLink', function( content ){

    // content: a blank string
    return ( this.ctx.data.useEmbeddedFeedbackForm === 'true' ) ? 'feedback' : 'javascript:alert("Links to external NHS survey.");';

});


//
// GET CAUSE OF DEATH LINK
//
addFilter('getCauseOfDeathLink', function( content ){

    // content: JSON data for the patient
    
    let arr = [];
    const yes = ( this.ctx.data.version === 'V10-1' ) ? 'yes' : 'dpd66Or65RadioYes';
    const no = ( this.ctx.data.version === 'V10-1' ) ? 'no' : 'dpd66Or65RadioNo';

    if( content.isNeoNatal === true ){
        arr.push('over-under-28='+yes);
    } else {
        arr.push('over-under-28='+no);
    }

    let link = 'cause-of-death';
    if( arr.length > 0 ){
        link += '?' + arr.join('&');
    }

    return link;

});

//
// GET CAUSE OF DEATH
//
/*
addFilter('getCauseOfDeath', function( content, patientStatus, fieldName ){

    // content: JSON data for the patient
    // patientStatus: the status code
    // fieldName: the fieldName to pull the value for

    const fields = ['main-cause','secondary-cause','other-conditions-c','other-conditions-d','other-significant-conditions'];
    const fieldIndex = 1 + fields.indexOf(fieldName);

    const camelCaseField = fieldName.split('-').map((word, index) => {
        if (index === 0) {
          return word.toLowerCase(); // First word stays lowercase
        } else {
          // Capitalize the first letter of each subsequent word
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      }).join('');

    let causeOfDeath = '';
    if( patientStatus === 1 ){

        causeOfDeath = this.ctx.data[fieldName] || '';

        const duration = this.ctx.data['duration'+fieldIndex] + ' ' + this.ctx.data['time-unit-duration-'+fieldIndex];
        
        if( duration.trim() !== '' && duration.indexOf('undefined') ){
            causeOfDeath += ', ' + duration;
        }
    } else {
        causeOfDeath = content[camelCaseField];
    }

    return causeOfDeath;

})
*/


//
// GENERATE STATIC SESSION DATA
//
addFilter('generateStaticSessionData', function(content){

     // content: the session data object
     return '<p class="govuk-body">You can copy this entire block of code into the \'session-data-defaults.js\' file for more robust testing. Remember to keep a copy of the dynamic version though.</p><textarea class="govuk-textarea">module.exports = '+JSON.stringify(content)+'</textarea>';

});

//
// FORMAT ADDRESS
//
addFilter('formatAddress',function(content){

    // content: an address with commas in it
    const addressArr = content.split(',');
    let address = '';
    addressArr.forEach( function( add, i ){
        
        if( i === 0 ){
            address += add;
        } else {
            address += '<br />' + add;
        }
        
    } );

    return address;

});


//
// GET MONTH STRING
//
addFilter('getMonthString', function(content) {

    // content: string, the month in the format 01 to 12

    let month = ( content && typeof content === 'string' ) ? 'January' : '';
    let months = { 
        en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        cy: ['Ionawr','Chwefror','Mawrth','Ebrill','Mai','Mehefin','Gorffennaf','Awst','Medi','Hydref','Tachwedd','Rhagfyr']
    };
    let num = parseInt( content );

    if( !Number.isNaN(num) && month ){

        if( num < 1 ){
            num = 1;
        }

        if( num > 12 ){
            num = 12;
        }

        month = months[this.ctx.data.lang][num-1];

    }
    

    return month;

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

    html += '</select>';
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
    const postCode = this.ctx.data.queryString;

    status = status.replace('[# results]', '<strong>'+noOfResults+'</strong>');
    status = status.replace('[postcode]', '<strong>'+postCode+'</strong>');

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
        case 'yes':
            path = 'on a neo-natal MCCD path';
            break;
        case 'dpd66Or65RadioNo':
        case 'no':
            path = 'on a general MCCD path';
            break;
        default:
            path = 'on an undetermined MCCD path'
            break;
    }

    let lang = '';
    if( this.ctx.data.bilingual === 'true' ){
        lang = ( this.ctx.data.lang === 'en' ) ? '(in English)' : '(in Welsh)';
    }
    const strVersion = ( this.ctx.version ) ? '(' + this.ctx.version + ') ' : '';
    const returnStr = ( this.ctx.data.debug === 'true' ) ?  strVersion + 'Currently acting ' + roleType + ' ' + path + ' ' + lang : strVersion;

    return returnStr;

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
addFilter( 'getStatusMultipleFilterOptions', function( content ){

    // content: blank string

    const settings = this.ctx.settings;
    const useSeparateDraftsTable = this.ctx.data[settings].useSeparateDraftsTable;
    const roleType = this.ctx.data['role-type'];

    const arr = [];
    const statuses = dashboard.getStatuses('','statuses',settings);

    statuses.forEach(function( status, i ){
        if( i === 0 && ( useSeparateDraftsTable === 'true' || roleType === 'meo' ) ){
            // Don't add drafts if there's a separate drafts table...
        } else {
            arr.push({ value : i, text: status });
        }
    });

    return arr;


});



//
// GET STATUS FILTER OPTIONS
//
addFilter( 'getStatusFilterOptions', function( content ){

    // content: statusFilter variable
    if( !Array.isArray(content) ){
        content = [];
    }

    const settings = this.ctx.settings;
    const useSeparateDraftsTable = this.ctx.data[settings].useSeparateDraftsTable;
    const roleType = this.ctx.data['role-type'];

    const statuses = dashboard.getStatuses('','statuses',settings);

    let html = ( this.ctx.data.lang === 'cy' ) ? '<option value="">Dangos pob statws</option>' : '<option value="">Show all statuses</option>';
    statuses.forEach(function( status, i ){

        if( i === 0 && ( useSeparateDraftsTable === 'true' || roleType === 'meo' ) ){
            // Don't add drafts if there's a separate drafts table...
        } else {
            html += ( content === i ) ? '<option selected value="'+i+'">' : '<option value="'+i+'">';
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
    
    let statusFilter = this.ctx.data.statusFilter;

    const settings = this.ctx.settings;
    const useSeparateDraftsTable = this.ctx.data[settings].useSeparateDraftsTable;

    if( typeof statusFilter === 'string' ){
        statusFilter = ( !Number.isNaN(parseInt(statusFilter)) ) ? [statusFilter] : [];
    } else if( Array.isArray(statusFilter) ) {
        statusFilter = this.ctx.data.statusFilter.slice();
    } else {
        statusFilter = [];
    }

    const roleType = ( this.ctx.data['role-type'] ) ? this.ctx.data['role-type'] : '';

    let caption = ( roleType === 'ap' ) ? 'Certificates created by you' : 'All certificates';
    if( this.ctx.data.lang === 'cy' ){
        caption = ( roleType === 'ap' ) ? 'Tystysgrifau a grëwyd gennych chi' : 'Pob tystysgrif';
    }

    const regex = /^[0-9\s]+$/;
    const isNHSNumber = regex.test(searchTerm);
    const spaceLessSearchTerm = searchTerm.split(' ').join('');

    if( searchTerm ){

        if( isNHSNumber ){
            if( spaceLessSearchTerm.length === 10 ){
                caption = ( this.ctx.data.lang === 'cy' ) ? 'Tystysgrifau gyda rhif GIG "'+searchTerm+'"' : 'Certificates with NHS number "'+searchTerm+'"';
            } else {
                caption = ( this.ctx.data.lang === 'cy' ) ? 'Tystysgrifau gyda rhif GIG sy\'n dechrau gyda "'+searchTerm+'"' : 'Certificates with NHS number beginning with "'+searchTerm+'"';
            }
        } else {
            caption = ( this.ctx.data.lang === 'cy' ) ? 'Tystysgrifau sy\'n cynnwys "'+searchTerm+'"' : 'Certificates containing "'+searchTerm+'"';
        }

    }

    // Have to handle multiple statuses now...

    let maxStatuses = dashboard.getStatuses( '', 'statuses', settings );
    maxStatuses = (useSeparateDraftsTable) ? maxStatuses.length - 1 : maxStatuses.length;

    if( statusFilter.length > 0 && statusFilter.length !== maxStatuses && maxStatuses > statusFilter.length ){

        let statusesArr = [];
        statusFilter.forEach(function(status){
            statusesArr.push( dashboard.getStatuses(status) );
        });

        if( this.ctx.data.lang === 'cy' ){
            caption += ( statusesArr.length > 1 ) ? ' gyda statwsau "' +  statusesArr.join(', ') + '"' : ' gyda statws "' +  statusesArr.join(', ') + '"';
        } else {
            caption += ( statusesArr.length > 1 ) ? ' with statuses "' + statusesArr.join(', ') + '"' : ' with status "' + statusesArr.join(', ') + '"';
        }

    }

    return caption;

});

//
// GET DASHBOARD TABLE HEAD
//
addFilter( 'getDashboardTableHead', function( content, sortBy, sortDirection, drafts ){

    // content:         blank string
    // sortBy:          name, date, status    ( defaults to date )
    // sortDirection:   ascending, descending ( defaults to ascending )

    const headers = {
        en: ['Deceased name','NHS number','Date of death','Action','Status'],
        cy: ['Enw marw','Rhif y GIG','Dyddiad marw','Gweithred','Statws']
    };

    const roleType = ( this.ctx.data['role-type'] ) ? this.ctx.data['role-type'] : '';
    let useSortableColumns = ( this.ctx.data[this.ctx.settings].useSortableColumns === 'true' ) ? true : false;
    if( !roleType ){
        useSortableColumns = false;
    }

    let baseLink = '?currentPage=0';
    let opposite = ( sortDirection === 'descending' ) ? 'ascending' : 'descending'; 

    // Name
    let nameLink = ( sortBy === 'name' ) ? baseLink + '&sortBy=name&sortDirection=' + opposite : baseLink + '&sortBy=name&sortDirection=ascending';
    let nameObj = ( drafts || !useSortableColumns ) ? { html: headers[this.ctx.data.lang][0] + '<br /><span class="govuk-body-s">'+headers[this.ctx.data.lang][1]+'</span>' } : {
        html: '<a href="'+nameLink+'">'+headers[this.ctx.data.lang][0]+'</a><span class="govuk-body-s">'+headers[this.ctx.data.lang][1]+'</span>',
        attributes: {
            'aria-sort': ( sortBy === 'name' ) ? sortDirection : 'none'
        } 
    };

    // Date
    let dateLink = ( sortBy === 'date' ) ? baseLink + '&sortBy=date&sortDirection=' + opposite : baseLink + '&sortBy=date&sortDirection=ascending';
    let dateObj = ( drafts || !useSortableColumns ) ? { text: headers[this.ctx.data.lang][2] } : {
        html: '<a href="'+dateLink+'">'+headers[this.ctx.data.lang][2]+'</a>',
        attributes: {
            'aria-sort': ( sortBy === 'date' ) ? sortDirection : 'none'
        } 
    };

    // Action
    actionObj = { text: headers[this.ctx.data.lang][3] };

    // Status
    let statusLink = ( sortBy === 'status' ) ? baseLink + '&sortBy=status&sortDirection=' + opposite : baseLink + '&sortBy=status&sortDirection=ascending';
    let statusObj = ( drafts || !useSortableColumns ) ? { text: headers[this.ctx.data.lang][4] } : {
        html: '<a href="'+statusLink+'">'+headers[this.ctx.data.lang][4]+'</a>',
        attributes: {
            'aria-sort': ( sortBy === 'status' ) ? sortDirection : 'none'
        }
    };

        /*
        let statusObj = ( roleType === 'me' ) ? { text: 'Status' } : {
            html: '<a href="'+statusLink+'">Status</a>',
            attributes: {
                'aria-sort': ( sortBy === 'status' ) ? sortDirection : 'none'
            } 
        };
        */

    return [ nameObj, dateObj, actionObj, statusObj ];

} );


//
// PROCESS STATUS FILTER
// The single filter returns a string, the multiple an array, but the component only accepts a comma separated list...
//
addFilter( 'processStatusFilter', function( content ){
    
    // content = data.statusFilter
   
    return ( Array.isArray(content) ) ? content.join(',') : content;


});


//
// SET DASHBOARD VARIABLES
// You'll need to set these before using the statuses on any page...
//
addFilter( 'setDashboardVariables', function( content ){

    // content: a blank string

    const roleType = ( this.ctx.data['role-type'] ) ? this.ctx.data['role-type'] : '';
    const settings = this.ctx.settings;
    const lang = ( ['en','cy'].indexOf(this.ctx.data.lang) > -1 ) ? this.ctx.data.lang : 'en';
    const debug = ( ['true','false'].indexOf(this.ctx.data.debug) > -1 ) ? this.ctx.data.debug : 'false';

    dashboard.setDashboardVariables( roleType, settings, lang, debug );

    return '';

});

//
// GET DASHBOARD TABLE ROWS
//
addFilter( 'getDashboardTableRows', function( content ) {
   
    // content: patient data from 'data-patients.html'

    const rowsPerPage = ( Number.isInteger( parseInt(this.ctx.data[this.ctx.settings].rowsPerPage) ) ) ? parseInt(this.ctx.data[this.ctx.settings].rowsPerPage) : 10;
    const currentPage = ( Number.isInteger( parseInt(this.ctx.data.currentPage) ) ) ? parseInt(this.ctx.data.currentPage) : 0;

    console.log( rowsPerPage );

    const searchTerm = ( this.ctx.data.searchTerm && this.ctx.data.searchTerm.trim().length > 2 ) ? this.ctx.data.searchTerm.trim() : '';
    let statusFilter = this.ctx.data.statusFilter;
    if( typeof statusFilter === 'string' ){
        statusFilter = ( !Number.isNaN(parseInt(statusFilter)) ) ? [statusFilter] : [];
    } else if( Array.isArray(statusFilter) ) {
        statusFilter = this.ctx.data.statusFilter.slice();
    } else {
        statusFilter = [];
    }
    
    const sortBy = ( this.ctx.data.sortBy ) ? this.ctx.data.sortBy : 'date';
    const sortDirection = ( this.ctx.data.sortDirection ) ? this.ctx.data.sortDirection : 'descending';

    const roleType = ( this.ctx.data['role-type'] ) ? this.ctx.data['role-type'] : '';

    const meSignOff = this.ctx.data['me-signoff'];
    const meoReview = this.ctx.data['meo-review'];
    const sentToRegistrar = ( this.ctx.data['sent-to-registrar'] ) ? true : false;

    const lastName = this.ctx.data['deceased-last-name'];

    const filterDrafts = ( this.ctx.data[this.ctx.settings].useSeparateDraftsTable === 'true' ) ? true : false;

    // Perform the filtering, search term first, then status filters, then orders by date...
    // I really need to tidy this up....
    let rows = dashboard.getFilteredResults( content, roleType, searchTerm, statusFilter, sortBy, sortDirection, meSignOff, meoReview, sentToRegistrar, filterDrafts, lastName );
    this.ctx.data.noOfFilteredRows = rows.length;

    rows = dashboard.getPaginatedResults( rows, rowsPerPage, currentPage );

    // If rows is empty, display an error message
    if( rows.length === 0 ){

        const noCertificatesFound = ( this.ctx.data.lang === 'cy' ) ? 'Dim tystysgrifau wedi\'u canfod' : 'No certificates found';

        rows.push( [{ html:'<span class="govuk-body">'+noCertificatesFound+'</span>', colspan: 5}] );
    }
    
   return rows;

});

//
// GET DASHBOARD TABLE ROWS
//
addFilter( 'getDashboardTableDraftRows', function( content ) {
   
    // content: patient data from 'data-patients.html'

    const roleType = ( this.ctx.data['role-type'] ) ? this.ctx.data['role-type'] : '';

    return dashboard.getDraftResults( content, roleType );

});



//
// GET DASHBOARD PAGINATION LINKS FUNCTION
//
addFilter( 'getDashboardPaginationLinks', function( content ){

    // content: blank string

    const rowsPerPage = ( Number.isInteger( parseInt(this.ctx.data[this.ctx.settings].rowsPerPage) ) ) ? parseInt(this.ctx.data[this.ctx.settings].rowsPerPage) : 10;
    const currentPage = ( Number.isInteger( parseInt(this.ctx.data.currentPage) ) ) ? parseInt(this.ctx.data.currentPage) : 0;
    
    const noOfFilteredRows = ( Number.isInteger(this.ctx.data.noOfFilteredRows) ) ? this.ctx.data.noOfFilteredRows : 0;
    const noOfPages = Math.ceil( noOfFilteredRows / rowsPerPage );

    let obj = {};

    if( noOfFilteredRows > rowsPerPage ){

        let items = [];

        if( currentPage !== 0 ){
            obj.previous = { 'href' : '?currentPage='+(currentPage-1) }
        }
        if( currentPage !== ( noOfPages - 1 ) ){
            obj.next = { 'href' : '?currentPage='+(currentPage+1) }
        }

        for( let i = 0; i < noOfPages; i++ ){

            let itemObj = {'number': (i+1), 'href':'?currentPage='+i };
            if( i === currentPage ){
                itemObj.current = true;
            }

            items.push( itemObj );

        }

        // Add ellipses if needed...
        if( items.length > 6 ){
            obj.items = dashboard.truncatePages(items,currentPage);
        } else {
            obj.items = items;
        }

    }

    obj.classes = 'govuk-pagination--'+this.ctx.data.lang;

    return obj;

} );


//
// GET PATIENT DATA BY ID
//
addFilter( 'getPatientDataByID', function( content, id ){

    // content: patient data from 'data-patients.html'
    
    const noOfRecords = ( Array.isArray( content ) && content.length > 0 ) ? content.length : 0;
    let patient = false;

    for( let i = 0; i < noOfRecords; i++ ){
        if( content[i].id === id ){
            patient = content[i];
            break;
        }
    }

    return patient;

} );


//
// GET CAUSE OF DEATH AND DURATION
// Generates a random duration between onset and death for a cause of death and returns formatted html
//
addFilter( 'getCauseOfDeathAndDuration', function( content, id ){

    // content: a string from the patient data, may or may not be blank

    const units = ['hours','minutes','days','months','years','unknown'];
    let unit = units[Math.round(Math.random()*(units.length-1))];

    let duration = 0;

    switch( unit ){
        case 'hours':
            duration = Math.round(Math.random()*23)+1; 
            break;

        case 'minutes':
            duration = Math.round(Math.random()*55)+5;
            break;

        case 'days':
            duration = Math.round(Math.random()*29)+1;
            break;

        case 'months':
            duration = Math.round(Math.random()*11)+1;
            break;

        case 'years':
            duration = Math.round(Math.random()*2)+1;
            break;

        default:
            duration = 0;
            unit = 'Unknown time';
            break;
    }

    if( duration === 1 ){
        unit = unit.substring(0,unit.length-1);
    }

    duration = ( duration === 0 ) ? unit : duration + ' ' + unit;
    
    const html = ( content ) ? '<div class="govuk-grid-column-one-half">' + content + '</div><div class="govuk-grid-column-one-half">' + duration + ' between onset and death</div>' : '';
    
    return html;

} );


//
// GET STATUS TAG
// Returns the html for a status tag set in the dashboard.js
//
addFilter( 'getStatusTag', function( content ){

    // content: status id
    
    let html = '';

    content = parseInt(content);
    if( !Number.isNaN( content ) ){
        html = dashboard.getStatuses(content, 'tags', this.ctx.settings );    
    }

    return html;

});

//
// GET STATUS EXPLANATION ROWS
// Returns the rows used in the status explanations feature
//
addFilter('getStatusExplanationRows', function(content) {

    // content: blank string
    
    const tags = dashboard.getStatuses( '', 'tags', this.ctx.settings );
    const explanations = dashboard.getStatuses( '', 'explanations', this.ctx.settings );

    const rows = [];
    tags.forEach(function( tag, i ){
        rows.push( [ { html: tag }, { text: explanations[i] } ] );
    });
    
    return rows;

});