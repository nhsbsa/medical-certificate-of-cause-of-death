const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

module.exports = router;


// SIGN IN JOURNEY

// GOV.UK Start > Index
router.post( /govuk-start/, (req, res) => {
    res.redirect('index');
});

router.post( /index/, (req, res) => {
    res.redirect('./login-page');
});



// MCCD SUMMARY
router.post( /mccd-summary/, (req, res) => {

    switch( req.session.data['role-type'] ){

        case 'ap':
        case 'me':
             // AP OR ME

             if( req.session.data['me-signoff'] === 'amend' || req.session.data['ap-signoff'] === 'amend' ){

                // Certificate needs amendments from the AP...
                res.redirect('confirmation')

             } else {
                
                // Certificate can be submitted to registrar by MEO...
                res.redirect('confirm-your-details');

             }

             break;

        default:
            // MEO
            res.redirect('confirmation')

            break;

    }

});

// DECLARATION
router.post( /declaration/, (req, res) => {
    res.redirect('confirmation');
});

// CONFIRMATION
router.post( /confirmation/, (req, res) => {

    // Reset the temporary demo filters...
    delete req.session.data['ap-signoff'];
    delete req.session.data['me-signoff'];
    delete req.session.data['meo-review'];
    delete req.session.data['ap-cert-declaration'];
    delete req.session.data['me-cert-declaration'];

    res.redirect('dashboard');

});