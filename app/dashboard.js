//
//
//
const _debugInternal = false;

let _roleType = '';
let _settings = '';
let _lang = '';

//
// SET DASHBOARD VARIABLES FUNCTION
//
function _setDashboardVariables( roleType, settings, lang, debug ){

    _roleType = roleType;
    _settings = settings;
    _lang = lang;
    _debug = debug;

    return true;

}


//
// GET AMENDS NOT SUBMITTED FUNCTION
// Extra translations for the Amends not submitted flag
//
function _getAmendsNotSubmittedFlag(){

    let flag = ( _lang === 'cy' ) ? 'Diwygiadau heb eu cyflwyno' : 'Amends not submitted';
 
    let tag = '<span class="govuk-tag govuk-tag--red govuk-!-margin-right-2">'+flag+'</span>';

    return tag;

}


//
// GET STATUSES FUNCTION
// Now all calls for statuses come via here - should make updating stuff easier...
//
function _getStatuses( num, returnType, settings ){

    // num: a number to return, else return everything
    // returnType: string - either 'statuses', 'tags' or 'explanations'
    // settings: string - either V10 or V11 (currently)

    const returnTypes = ['statuses','tags','explanations'];
    returnType = ( returnTypes.indexOf(returnType) > -1 ) ? returnType : 'statuses';

    const settingsArr = ['V10','V11'];
    settings = ( settingsArr.indexOf(settings) > -1 ) ? settings : 'V10';

    num = parseInt(num);

    const values = {};
    values.V10 = {};
    values.V11 = {};

    //
    // STATUSES
    //
    values.V10.statuses = {};
    values.V10.statuses.en = [
        'Draft',
        'For officer review',
        'To be amended',
        'For sign off by medical examiner',
        'Review complete - send to register office',
        'Submitted to register office'
    ];
    values.V10.statuses.cy = [
        'Drafft',
        'I\'w adolygu gan swyddogion',
        'I\'w ddiwygio',
        'I\'w gymeradwyo gan archwiliwr meddygol',
        'Adolygiad wedi\'i gwblhau - anfon i\'r swyddfa gofrestru',
        'Cyflwynwyd i\'r swyddfa gofrestru'
    ];

    // Currently the same
    values.V11.statuses = {};
    values.V11.statuses.en = values.V10.statuses.en;
    values.V11.statuses.cy = values.V10.statuses.cy;

    //
    // TAGS
    //
    values.V10.tags = {};
    values.V10.tags.en = [ 
        '<span class="govuk-tag govuk-tag--grey">'+values.V10.statuses.en[0]+'</span>',
        '<span class="govuk-tag govuk-tag--blue">'+values.V10.statuses.en[1]+'</span>',
        '<span class="govuk-tag govuk-tag--orange">'+values.V10.statuses.en[2]+'</span>',
        '<span class="govuk-tag govuk-tag--green">'+values.V10.statuses.en[3]+'</span>',
        '<span class="govuk-tag govuk-tag--purple">'+values.V10.statuses.en[4]+'</span>',
        '<span class="govuk-tag">'+values.V10.statuses.en[5]+'</span>'
    ];
    values.V10.tags.cy = [ 
        '<span class="govuk-tag govuk-tag--grey">'+values.V10.statuses.cy[0]+'</span>',
        '<span class="govuk-tag govuk-tag--blue">'+values.V10.statuses.cy[1]+'</span>',
        '<span class="govuk-tag govuk-tag--orange">'+values.V10.statuses.cy[2]+'</span>',
        '<span class="govuk-tag govuk-tag--green">'+values.V10.statuses.cy[3]+'</span>',
        '<span class="govuk-tag govuk-tag--purple">'+values.V10.statuses.cy[4]+'</span>',
        '<span class="govuk-tag">'+values.V10.statuses.cy[5]+'</span>'
    ];

    values.V11.tags = {};
    values.V11.tags.en = [ 
        '<span class="govuk-tag govuk-tag--grey">'+values.V11.statuses.en[0]+'</span>',
        '<span class="govuk-tag govuk-tag--blue">'+values.V11.statuses.en[1]+'</span>',
        '<span class="govuk-tag govuk-tag--orange">'+values.V11.statuses.en[2]+'</span>',
        '<span class="govuk-tag govuk-tag--green">'+values.V11.statuses.en[3]+'</span>',
        '<span class="govuk-tag govuk-tag--purple">'+values.V11.statuses.en[4]+'</span>',
        '<span class="govuk-tag">'+values.V11.statuses.en[5]+'</span>'
    ];
    values.V11.tags.cy = [ 
        '<span class="govuk-tag govuk-tag--grey">'+values.V11.statuses.cy[0]+'</span>',
        '<span class="govuk-tag govuk-tag--blue">'+values.V11.statuses.cy[1]+'</span>',
        '<span class="govuk-tag govuk-tag--orange">'+values.V11.statuses.cy[2]+'</span>',
        '<span class="govuk-tag govuk-tag--green">'+values.V11.statuses.cy[3]+'</span>',
        '<span class="govuk-tag govuk-tag--purple">'+values.V11.statuses.cy[4]+'</span>',
        '<span class="govuk-tag">'+values.V11.statuses.cy[5]+'</span>'
    ];

    //
    // EXPLANATIONS
    //
    values.V10.explanations = {};
    values.V10.explanations.en = [
        'The MCCD has not been submitted.',
        'An attending practitioner has submitted the MCCD and it has been passed to a medical examiner office for review by a medical examiner officer.',
        'A medical examiner has reviewed the MCCD and requires the attending practitioner to make changes.',
        'The MCCD requires scrutiny from an medical examiner.',
        'The MCCD is ready to be sent to the local register office by a medical examiner officer.',
        'The MCCD has been sent to the local register office.'
    ];
    values.V10.explanations.cy = [
        'Nid yw\'r MCCD wedi cael ei gyflwyno.',
        'Mae ymarferydd sy\'n mynychu wedi cyflwyno\'r MCCD ac mae wedi\'i drosglwyddo i swyddfa archwiliwr meddygol i\'w adolygu gan swyddog archwilio meddygol.',
        'Mae archwiliwr meddygol wedi adolygu\'r MCCD ac yn ei wneud yn ofynnol i\'r ymarferydd sy\'n mynychu wneud newidiadau.',
        'Mae angen i archwiliwr meddygol graffu ar yr MCCD.',
        'Mae\'r MCCD yn barod i gael ei anfon i\'r swyddfa gofrestru leol gan swyddog archwilio meddygol.',
        'Mae\'r MCCD wedi cael ei anfon i\'r swyddfa gofrestru leol.'
    ];

    values.V11.explanations = {};
    values.V11.explanations.en = values.V10.explanations.en; // Same for now
    values.V11.explanations.cy = values.V10.explanations.cy; // Same for now
  

    let returnVal = ( Number.isNaN(num) ) ? values[settings][returnType][_lang] : values[settings][returnType][_lang][num];
    

    return returnVal;

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

    if( _debugInternal ){
        console.log( '_filterBySearchTerm(); Rows remaining: ' + rows.length );
    }

    return rows;

}

//
// FILTER BY STATUS FUNCTION
//
function _filterByStatus( rows, statusFilter ) {

    const arr = [];

    rows.forEach(function( row ){

        if( !Array.isArray(statusFilter) || statusFilter.length === 0 ){

            // Not an array, or nothing in there...
            arr.push( row );

        } else {

            // An array of strings...
            let num = String(row[row.length-1].text);
            
            if( statusFilter.indexOf( num ) > -1  ){
                arr.push( row );
            }

        }
        
    });

    if( _debugInternal ){
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

    if( _debugInternal ){
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

    if( _debugInternal ){
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
        ap: {
            en: ['Finish certificate','View certificate','Amend certificate','View certificate','View certificate','View certificate'],
            cy: ['Tystysgrif gorffen','Gweld tystysgrif','Diwygio tystysgrif','Gweld tystysgrif','Gweld tystysgrif','Gweld tystysgrif']
        },
        me: {
            en: ['Finish certificate','XXX certificate','XXX certificate','Review certificate','View certificate','View certificate'],
            cy: ['Tystysgrif gorffen','XXX certificate','XXX certificate','Adolygu tystysgrif','Gweld tystysgrif','Gweld tystysgrif']
        },
        meo: {
            en: ['XXX certificate','Review certificate','View certificate','View certificate','Download certificate','View certificate'],
            cy: ['XXX certificate','Adolygu tystysgrif','Gweld tystysgrif','Gweld tystysgrif','Lawrlwytho tystysgrif','Gweld tystysgrif']
        }
    }

    const useAliases = true;
    let link = 'mccd-summary?id='+id;

    let html = '';

    switch ( status ){

        // Amends not submitted
        case -1:
            let linkText = ( _lang === 'cy' ) ? 'Cyflwyno gwelliannau' : 'Submit amends';
            html = '<a class="govuk-link" href="submit-amends?id='+id+'">'+linkText+'</a>';
            break;

        // Draft
        case 0:
            html = '<a class="govuk-link" href="mccd-tasklist">'+actions[_roleType][_lang][status]+'</a>';
            break;

        default: 
            if( useAliases ){
                link = actions[_roleType]['en'][status].toLowerCase().split(' ').join('-') + '?id='+id;
            }
            html = '<a class="govuk-link" href="'+link+'">'+actions[_roleType][_lang][status]+'</a>';
            break;

    }

    return html;
};


//
// GET ROW FUNCTION
//
function _getRow( patient ){

    let arr = [];
    let neoNatal = ( patient.isNeoNatal === true ) ? '65' : '66'; 
    let extra = ( _debug === 'true' ) ? ' ('+neoNatal+patient.certificateType.toUpperCase()+') ' : '';

    let nameAndNumber = patient.lastNameFirst + extra + '<br /><span class="govuk-body-s"><span class="govuk-visually-hidden">NHS number: </span>' + patient.nhsNo + '</span>';

    arr.push( { html: nameAndNumber } );
    arr.push( { text: _translateDate( patient.dateOfDeath ) } );
    
    if( patient.amendsNotSubmitted === true && _roleType === 'ap' ){

        // Amends not submitted flag
        arr.push( { html: _getActionForStatus( -1, patient.id ) } );
        arr.push( { text: patient.status, html: _getAmendsNotSubmittedFlag() });

    } else {

        // Normal statuses
        arr.push( { html: _getActionForStatus( patient.status, patient.id ) } );

        if( patient.amendsNotSubmitted === true ){
            // Needed for MEOs - they don't get a custom link
            arr.push( { text: patient.status, html: _getAmendsNotSubmittedFlag() });
        } else {
            // Normal
            arr.push( { text: patient.status, html: _getStatuses( patient.status, 'tags', _settings ) });
        }
        
    
    }

    return arr;

}

//
// TRANSLATE DATE FUNCTION
//
function _translateDate( date ){

    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const monthsWelsh = ['Ionawr','Chwefror','Mawrth','Ebrill','Mai','Mehefin','Gorffennaf','Awst','Medi','Hydref','Tachwedd','Rhagfyr'];

    if( _lang === 'cy' ){
        months.forEach(function( month, i ){
            date = date.split(month).join(monthsWelsh[i]);
        });
    }

    return date;

}

//
// OVERRIDE ROWS FOR TESTING FUNCTION
//
function _overrideRowsForTesting( rows, meSignOff, meoReview, sentToRegistrar, lastName ){

    let overrideRows = true;
    let lastNameString = lastName || '';

    if( _debugInternal ){
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

    if( _debugInternal ){
        console.log( 'START FILTERING ----------------' ); 
    }

    const filteredRows = _filterBySortBy( _filterByStatus( _filterBySearchTerm( _filterByRoleType( _overrideRowsForTesting( _filterDrafts( rows, filterDrafts ), meSignOff, meoReview, sentToRegistrar, lastName ), roleType ), searchTerm ), statusFilter ), sortBy, sortDirection );

    if( _debugInternal ){
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
// TRUNCATE PAGES FUNCTION
//
function _truncatePages(pageObjects, currentPage) {
    
    const noOfPages = pageObjects.length;
  
    // Start building the truncated array
    const result = [];
  
    // Handle edge case when currentPage is the first item
    if (currentPage === 0) {
      // Always include the first item
      result.push(pageObjects[0]);
  
      // Add the next two items if they exist
      if (noOfPages > 1) result.push(pageObjects[1]);
      if (noOfPages > 2) result.push(pageObjects[2]);
  
      if (noOfPages > 3) result.push({ 'ellipsis': true }); // Add ellipsis if there are more items beyond the first three
  
      // Always include the last item
      result.push(pageObjects[noOfPages - 1]);
  
      return result;
    }
  
    // Handle edge case when currentPage is the last item
    if (currentPage === noOfPages - 1) {
      // Always include the first item
      result.push(pageObjects[0]);
  
      if (noOfPages > 4) result.push({ 'ellipsis': true }); // Add ellipsis if there are more than four items
  
      // Include the last three items
      if (noOfPages > 2) result.push(pageObjects[noOfPages - 3]);
      if (noOfPages > 1) result.push(pageObjects[noOfPages - 2]);
      result.push(pageObjects[noOfPages - 1]);
  
      return result;
    }
  
    // Normal case: currentPage is somewhere in the middle
    // Always include the first item
    result.push(pageObjects[0]);
  
    // Determine the range of items around the current item
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(noOfPages - 2, currentPage + 1);
  
    // Add ellipsis if necessary between the first item and the range
    if (start > 1) {
      result.push({ 'ellipsis': true });
    }
  
    // Add the range of items around the current item
    for (let i = start; i <= end; i++) {
      result.push(pageObjects[i]);
    }
  
    // Add ellipsis if necessary between the range and the last item
    if (end < noOfPages - 2) {
      result.push({ 'ellipsis': true });
    }
  
    // Always include the last item
    result.push(pageObjects[noOfPages - 1]);
  
    return result;

}


//
// EXPORT EVERYTHING
//
module.exports = {
    getDraftResults: _getDraftResults,
    getFilteredResults: _getFilteredResults,
    getPaginatedResults: _getPaginatedResults,
    getStatuses: _getStatuses,
    setDashboardVariables: _setDashboardVariables,
    truncatePages: _truncatePages
}