
//
// RELOADS PAGE AUTOMATICALLY WHEN USING THE BACK BUTTON
//
window.addEventListener( 'pageshow', function ( event ) {

  console.log( event );
    const historyTraversal = event.persisted || ( typeof window.performance != 'undefined' && window.performance.getEntriesByType('navigation')[0].type === 'back_forward' );
    if ( historyTraversal ) {
      window.location.reload();
    }
});

//
// CHECK FOR LANGUAGE CHANGE
//
window.addEventListener('DOMContentLoaded',function(){

  let url = new URL( window.location.href )
  let params = new URLSearchParams(url.search);

  if( params.get('lang') ){
    history.back();
  } 

});