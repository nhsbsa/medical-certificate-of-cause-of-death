
//
// GET TRANSLATIONS FUNCTION
//
function _getTranslations(){

  const excelToJSON = require('convert-excel-to-json');
  const json = excelToJSON({
    sourceFile: 'app/data/MCCD-localisation.xlsx'
  });

  const translations = {};
  const addWelsh = true;

  if( json ){

    Object.keys(json).forEach(function(key){

      const arr = json[key];

      if( arr && Array.isArray(arr) ){
        arr.forEach(function( row, i ){

          if( i > 0 ){
            if( row.B && row.B.trim() !== '' ){

              // Englis
              let enRow = row.C;
              let en = ( enRow && enRow.trim() !== '' ) ? enRow : '[English missing]';
              en = en.replace(/(?:\r\n|\r|\n)/g, '<br />');

              // Welsh
              let cyRow = row.F;
              let cy = ( cyRow && cyRow.trim() !== '' ) ? cyRow : '[Welsh missing]';
              cy = cy.replace(/(?:\r\n|\r|\n)/g, '<br />');

              let obj = { en: en };

              if( addWelsh ){
                obj.cy = cy;
              }

              translations[row.B] = obj;

            }
          }

        });
      }

    });

  }

  return translations;

}

module.exports = {

  debug: 'false',

  user: { 
    name: 'Kelly Jones',
    role: ['ap','meo','me'],
    email: 'kelly.jones@example.com',
    hospitalName: 'St Gemma\'s Hospice',
    address: 'St Gemma\'s Hospice, 329 Harrogate Road, Leeds, LS17 6QD',
    gmcNumber: '6357345'
  },

  currentPage: 0,
  sortBy: 'date',
  sortDirection: 'ascending',
  
  lang: 'en',
  bilingual: 'false',
  gmcNumberValidated: 'false',

  V10: {

    timeout: 30,
    rowsPerPage: 500,

    validateTaskList: 'true',
    validateCauseOfDeathScreen: 'true',
    validateNeoNatalUnder24HoursAge: 'true',

    nhsNumberAlreadyUsed: 'true',

    useSearch: 'false',
    useFilters: 'false',
    useMultipleFilters: 'false',
    useSortableColumns: 'false',
    useSeparateDraftsTable: 'false',
    useEmbeddedFeedbackForm: 'false',

    showContactMethodScreen: 'false',
    showExplanationOfStatuses: 'false'

  },

  V11: {

    timeout: 30,
    rowsPerPage: 20,

    validateTaskList: 'true',
    validateCauseOfDeathScreen: 'true',
    validateNeoNatalUnder24HoursAge: 'true',

    nhsNumberAlreadyUsed: 'true',
    
    useSearch: 'false',
    useFilters: 'false',
    useMultipleFilters: 'false',
    useSortableColumns: 'true',
    useSeparateDraftsTable: 'false',
    useEmbeddedFeedbackForm: 'false',

    showContactMethodScreen: 'false',
    showExplanationOfStatuses: 'false',

    showBilingualService: 'true',
    hasUsedBilingualService: 'true'

  },
  
  translations: _getTranslations()

}
