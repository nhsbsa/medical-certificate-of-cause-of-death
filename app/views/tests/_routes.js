const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

module.exports = router;


// Officer review
router.post(/officer-review/, (req, res) => {
    res.redirect('confirmation?role-type=meo')
});

// ME signoff > Qualifications
router.post(/me-signoff/, (req, res) => {
    res.redirect('qualifications')
});

    // > Qualifications > Declaration
    router.post(/qualifications/, (req, res) => {
        res.redirect('declaration')
    });

        // > Declaration > Confirmation page
        router.post(/me-signoff-dec/, (req, res) => {
            res.redirect('confirmation?role-type=me')
        });