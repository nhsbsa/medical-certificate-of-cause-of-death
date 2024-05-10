
//
// GET TRANSLATIONS FUNCTION
//
function _getTranslations(){

  const excelToJSON = require('convert-excel-to-json');
  const json = excelToJSON({
    sourceFile: 'app/data/MCCD-localisation.xlsx'
  });

  const translations = {};
  const addWelsh = false;

  if( json ){

    Object.keys(json).forEach(function(key){

      const arr = json[key];

      if( arr && Array.isArray(arr) ){
        arr.forEach(function( row, i ){

          if( i > 0 ){
            if( row.B && row.B.trim() !== '' ){

              // English
              let en = ( row.C && row.C.trim() !== '' ) ? row.C : '[English missing]';
              en = en.replace(/(?:\r\n|\r|\n)/g, '<br />');

              // Welsh
              let cy = ( row.E && row.E.trim() !== '' ) ? row.E : '[Welsh missing]';
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
    gmcNumber: '6357812462'
  },

  useSearch: 'false',
  useFilters: 'false',
  separateDraftsTable: 'false',

  rowsPerPage: 10,
  currentPage: 0,
  sortBy: 'date',
  sortDirection: 'ascending',
  
  lang: 'en',
  bilingual: 'false',

  requireAllTaskListSections: 'false',
  showContactMethodScreen: 'false',
  validateCauseOfDeathScreen: 'true',
  validateNeoNatalUnder24HoursAge: 'true',
  
  translations: _getTranslations()

}
