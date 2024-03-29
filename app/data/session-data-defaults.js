
//
// GET TRANSLATIONS FUNCTION
//
function _getTranslations(){

  const excelToJSON = require('convert-excel-to-json');
  const json = excelToJSON({
    sourceFile: 'app/data/MCCD-localisation.xlsx'
  });

  const translations = {};

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

              translations[row.B] = { en: en, cy: cy };

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
  useSearch: 'false',
  rowsPerPage: 10,
  currentPage: 0,
  sortBy: 'date',
  sortDirection: 'ascending',
  lang: 'en',
  translations: _getTranslations()

}
