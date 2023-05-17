// ************************************************************
// CURRENT VERSION
// ************************************************************

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ************************************************************
// MFA set up
// ************************************************************

// Email example screen
router.post(/account-created-email/, (req, res) => {
    
    req.session.data['account-creation-journey'] = 'active'
    res.redirect('../index')

});

// Sign in
router.post(/login-page/, (req, res) => {

    const accountCreationJourney = req.session.data['account-creation-journey']
    
    if (accountCreationJourney == 'active') {
        res.redirect('../MFA/set-password')
    } else {
        res.redirect('enter-code')
    }

});

// Set your password
router.post(/set-password/, (req, res) => {
    res.redirect('set-up-authenticator')
});

// Set up your account with an authentication app   
router.post(/set-up-authenticator/, (req, res) => {
    
    const authType = req.session.data['radioGroupAuth']
    
    if(authType == 'desktop') {
        res.redirect('enter-key')
    } else {
        res.redirect('get-security-code')
    }

});

// Finish set up
router.post(/auth-setup/, (req, res) => {
    res.redirect('done')
});

// ************************************************************

// login page
router.post(/login-page/, (req, res) => {
    res.redirect('enter-code')
});

// Enter authentication code for login
router.post(/enter-code/, (req, res) => {
    res.redirect('66-or-65')
});

// Was the death more than 28 days after the birth?
router.post(/66-or-65/, (req, res) => {
   
    const underOverTwentyEightDays = req.session.data['over-under-28']

    if (underOverTwentyEightDays == 'yes') {
        res.redirect('name-of-the-deceased')
    } else {
        res.redirect('under-28-ko')
    }

});

// What is the deceased person's name?
router.post(/name-of-the-deceased/, (req, res) => {
    res.redirect('date-of-death')
});

// What is their date of death?
router.post(/date-of-death/, (req, res) => {
    res.redirect('age-66')
});

// What was the deceased persons age?
router.post(/age-66/, (req, res) => {
    res.redirect('last-seen-alive')
});

// Did you see the deceased person before they died?
router.post(/last-seen-alive/, (req, res) => {
    
    const lastSeenAlive = req.session.data['last-seen-alive']
    
    if (lastSeenAlive == 'yes') {
        res.redirect('date-last-seen')
    } else {
        res.redirect('death-hospital')
    }
    
});

// When did you last see them alive?
router.post(/date-last-seen/, (req, res) => {
    res.redirect('death-hospital')
});

// Was the death in a hospital?
router.post(/death-hospital/, (req, res) => {
    
    const deathInHospital = req.session.data['death-in-hospital']
    const consultantName = req.session.data['consultant']
    
    if (deathInHospital == 'yes') {
        res.redirect('location-death-hospital')
    } else {
        res.redirect('location-of-death')
    }
    
});

// At which hospital did the death occur?
router.post(/death-location-hospital/, (req, res) => {
    res.redirect('cya-deceased')
});

// Do you know the full address of the death?
router.post(/location-of-death/, (req, res) => {
    
    const locationOfDeath = req.session.data['location-of-death']
    
    if (locationOfDeath == 'yes') {
        res.redirect('exact-address')
    } else {
        res.redirect('unknown-address')
    }
    
});

// What was the approximate location of the death?
router.post(/unknown-address/, (req, res) => {
    res.redirect('cya-deceased')
});

// What was the location of the death?
router.post(/exact-address/, (req, res) => {
    res.redirect('cya-deceased')
});

// ************************************************************
// Actions after death section
// ************************************************************

// Has a post-mortem been held?
router.post(/death-circumstances/, (req, res) => {
    res.redirect('death-seen-by')
});

// Was the deceased person seen by a doctor after their death?
router.post(/death-seen-by/, (req, res) => {
    res.redirect('cya-death-circumstances')
});

// Check your answers
router.post(/check-your-answers-dc/, (req, res) => {

    req.session.data['actions-after-death-section'] = 'completed'

    res.redirect('mccd-tasklist')
});

// ************************************************************
// Cause of death section
// ************************************************************

// What caused the death?
router.post(/cause-of-death/, (req, res) => {
    res.redirect('caused-by-employment')
});

// Could the deceased person's job have caused or contributed to their death?
router.post(/caused-by-employment/, (req, res) => {
    res.redirect('cya-cause-death')
});

// Check your answers
router.post(/check-your-answers-cod/, (req, res) => {
    
    req.session.data['cause-of-death-section'] = 'completed'
    
    res.redirect('mccd-tasklist')
});

// ************************************************************
// Your details section
// ************************************************************

// What is your name?
router.post(/your-name/, (req, res) => {
    res.redirect('gmc-number')
});

// What is your GMC number?
router.post(/gmc-number/, (req, res) => {
    res.redirect('qualifications')
});

// What are your qualifications?
router.post(/qualifications/, (req, res) => {
    res.redirect('your-residency')
});

// Where do you work?
router.post(/your-residency/, (req, res) => {
    res.redirect('cya-declare')
});

// check your answers
router.post(/check-your-answers-declare/, (req, res) => {

    req.session.data['your-details-section'] = 'completed'

    res.redirect('mccd-tasklist')
});

// ************************************************************
// Declaration
// ************************************************************

// Declaration
router.post(/declaration/, (req, res) => {
    res.redirect('send-mccd-copy')
});

// Send a copy of the MCCD
router.post(/send-mccd-copy/, (req, res) => {
    res.redirect('notice-to-informant')
}); 

// Where do you need to send the notice to informant?
router.post(/send-notice-to-informant/, (req, res) => {
    res.redirect('cya-emails')
}); 

// Where do you need to send the notice to informant?
router.post(/start-new-mccd/, (req, res) => {
    req.session.data = {}
    res.redirect('index')
}); 


module.exports = router;