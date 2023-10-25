// ************************************************************
// CURRENT VERSION
// ************************************************************

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// External dependencies
const axios = require('axios')

// Find your address

// ************************************************************
// Postcode Lookup
// ************************************************************

router.get(/postcode-lookup/, (req, res) => {

    // Get the 'postcode' data from the submitted form
    var postcodeLookup = req.session.data['postcode']

    // Define a 'regular expression' to validate the postcode format
    const regex = RegExp('^([A-PR-UWYZ](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Y][0-9]([0-9]|[ABEHMNPRVWXY])?)) ?[0-9][ABD-HJLNP-UW-Z]{2})$');

    // Check if 'postcodeLookup' has a value
    if (postcodeLookup) {

        // Check if the 'postcodeLookup' matches the specified 'regular expression'
        if (regex.test(postcodeLookup) === true) {

            // Make an HTTP GET request to an external API (OS UK) to retrieve address data based on the postcode
            axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key="+ process.env.POSTCODEAPIKEY)
            .then(response => {
                // Extract and map the addresses from the API response
                var addresses = response.data.results.map(result => result.DPA.ADDRESS);

                // Format the addresses in title case
                const titleCaseAddresses = addresses.map(address => {
                    const parts = address.split(', ');
                    const formattedParts = parts.map((part, index) => {
                        if (index === parts.length - 1) {
                            // Preserve postcode (SW1A 2AA) in uppercase
                            return part.toUpperCase();
                        }
                        return part
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(' ');
                    });
                    return formattedParts.join(', ');
                });

                // Store the formatted addresses in the session data
                req.session.data['addresses'] = titleCaseAddresses;

                // Redirect to the 'Select Address' page
                res.redirect('select-address')
            })
            .catch(error => {
                // Redirect in case of an error
                res.redirect('no-address-found')
            });

        }

    } else {
        // Redirect if 'postcodeLookup' is empty
        res.redirect('where-do-you-work')
    }

})

router.post(/select-address/, (req, res) => {
    res.redirect('details-cya')
});

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
// Medical Examiner Authorisation Journey
// ************************************************************

router.post(/role-assignment/, (req, res) => {    
    
    const roleType = req.session.data['role-type']
    res.redirect('your-name')

});

router.post(/me-full-name/, (req, res) => {    
    res.redirect('me-gmc-number')
});

router.post(/me-gmc-number/, (req, res) => {    
    res.redirect('primary-qualification')
});

router.post(/primary-qualification/, (req, res) => {    
    res.redirect('where-do-you-work')
});

router.post(/me-email-address/, (req, res) => {    
    res.redirect('../MFA/set-password')
});

router.post(/me-declaration/, (req, res) => {    
    res.redirect('me-mccd-reviewed')
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
   
    res.redirect('name-of-the-deceased')

});

// What is the deceased person's name?
router.post(/name-of-the-deceased/, (req, res) => {
    res.redirect('date-of-death')
});

// What is their date of death?
router.post(/date-of-death/, (req, res) => {
    
    const overUnder28 = req.session.data['over-under-28']
    
    if (overUnder28 == 'yes') {
        res.redirect('age-66')
    } else {
        res.redirect('neo-natal-deaths/deceased-persons-age')
    }
    
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
router.post(/death-location/, (req, res) => {
    
    const overUnder28 = req.session.data['over-under-28']

    if ( overUnder28 == 'yes') {
        res.redirect('cya-deceased')
    } else {
        res.redirect('neo-natal-deaths/location-born')
    }
    

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
    
    const overUnder28 = req.session.data['over-under-28']

    if (overUnder28 == 'yes') {
        res.redirect('caused-by-employment')
    } else {
        res.redirect('cya-cause-death')
    }

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
    // req.session.data = {}
    res.redirect('dashboard')
});

// ************************************************************
// Neo-Natal Deaths Journey
// ************************************************************

// What was the deceased person's age?
router.post(/deceased-persons-age/, (req, res) => {
    
    res.redirect('what-is-their-sex')
    
});

// What is their sex?
router.post(/what-is-their-sex/, (req, res) => {
    
    res.redirect('../last-seen-alive')
    
});

// Where were they born?
router.post(/location-born/, (req, res) => {
    
    res.redirect('../cya-deceased')
    
});




module.exports = router;