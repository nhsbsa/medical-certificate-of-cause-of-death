
// ************************************************************
// ONLY USE NOTIFY ON HEROKU
// ************************************************************

if( process.env.NOTIFYAPIKEY ){
    const NotifyClient = require('notifications-node-client').NotifyClient;
    const notify = new NotifyClient(process.env.NOTIFYAPIKEY);
}


// ************************************************************
// CURRENT VERSION
// ************************************************************

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// External dependencies
const axios = require('axios')


// ************************************************************
// USER DATA FROM HEROKU
// ************************************************************

router.use((req, res, next) => {

    let userProfile = ( req.session.data.userProfile ) ? req.session.data.userProfile : '0';

    const users = ( process.env.USERS ) ? JSON.parse( process.env.USERS ) : [];
    userProfile = parseInt(userProfile);

    if( !Number.isNaN(userProfile) && users.length > userProfile ){

        req.session.data.user = users[userProfile];

        // If there's only one role type, set it automatically...
        if( req.session.data.user.role.length === 1 ){
            req.session.data['role-type'] = req.session.data.user.role[0];
        }

    }
  
    next();

});



// ************************************************************
// SIGN IN 
// ************************************************************

// Sign in page
router.post(/login-page/, (req, res) => {
    res.redirect('enter-code')
});

// Enter authentication code for login
router.post(/enter-code/, (req, res) => {
    res.redirect('66-or-65')
});

// ***************************************************************************************************
// MCCD Creation flow
// ***************************************************************************************************

// Was the death more than 28 days after the birth?
router.post(/66-or-65/, (req, res) => {
    res.redirect('nhs-number')
    res
});

// What is the deceased persons NHS Number
router.post(/nhs-number/, (req, res) => {
    res.redirect('name-of-the-deceased')
});

// What is the deceased person's name?
router.post(/name-of-the-deceased/, (req, res) => {
    res.redirect('date-of-birth')
});

// What was the deceased persons age?

    // If Over 28 > Age
router.post(/date-of-birth/, (req, res) => {

    const overUnder28 = req.session.data['over-under-28']



    if (overUnder28 == 'no') {
        res.redirect('age-66')

    // If Under 28 > Location of birth

    } else {
        res.redirect('neo-natal-deaths/location-born')

    }
});

// Under 28 - Location of birth > Age
router.post(/location-born/, (req, res) => {
    res.redirect('triage-24-hours')
});

router.post(/triage-24-hours/, (req, res) => {
    res.redirect('deceased-persons-age')
});


// What is their ethnicity?

// Over 28
router.post(/age-66/, (req, res) => {
    res.redirect('ethnicity/ethnic-group')
});

// Under 28
router.post(/deceased-persons-age/, (req, res) => {
    res.redirect('/V10-1/ethnicity/ethnic-group')
});

router.post(/age-65-hours/, (req, res) => {
    res.redirect('ethnicity/ethnic-group')
});

router.post(/ethnic-group/, (req,res) => {
    var ethnicGroup = req.session.data['ethnic-group']
    if (ethnicGroup == 'white'){
        res.redirect('ethnicity-white')
    }else if (ethnicGroup == 'multiple'){
        res.redirect('ethnicity-mixed')
    }else if (ethnicGroup == 'asian'){
        res.redirect('ethnicity-asian')
    }else if (ethnicGroup == 'black'){
        res.redirect('ethnicity-black')
    }else if (ethnicGroup == 'skip'){
        res.redirect('../date-of-death')
    }else{
    res.redirect('ethnicity-other')
    }
});

// What is their date of death?
router.post(/ethnicity/, (req, res) => {
    res.redirect('../date-of-death')
});

// PLACE OF DEATH

// Was the death in a hospital?
router.post(/date-of-death/, (req, res) => {
    res.redirect('death-hospital')
});

// Hospital - postcode lookup
router.post(/death-hospital/, (req, res) => {

    const DeathHospital = req.session.data['death-in-hospital']

    if (DeathHospital == 'yes') {
        res.redirect('./place-of-death/hospital-postcode')
    } else {
        res.redirect('./place-of-death/location-of-death')

    }
});

// Hospital - select address

router.post(/hospital-postcode/, (req, res) => {
    res.redirect('select-hospital-address')

});

// Another location - postcode lookup
router.post(/location-of-death/, (req, res) => {

    const LocationDeathKnown = req.session.data['location-of-death']

    if (LocationDeathKnown == 'no') {
        res.redirect('unknown-address')
    } else {
        res.redirect('another-location-postcode')
    }

});

// Exact address
router.post(/death-location/, (req, res) => {
    res.redirect('../cya-deceased')
    
});

router.post(/unknown-address/, (req, res) => {
    res.redirect('cya-deceased')
});

// Check your answers
router.post( /check-your-answers-d/, (req, res) => {
    req.session.data['deceasedComplete'] = 'true';
    res.redirect('mccd-tasklist');
});

// ************************************************************
// Actions after death section
// ************************************************************

// Has a post-mortem been held?
router.post(/death-circumstances/, (req, res) => {
    res.redirect('box-b')
});

// Box B [ONS requirement]
router.post(/box-b/, (req, res) => {
    // grab value from the data store
    let completeAfterDeath = req.session.data.afterDeathComplete
    var userRole = req.session.data['role-type']

    if (userRole == 'me' && completeAfterDeath === 'true'){
        res.redirect('cya-death-circumstances') 
    }else if (userRole == 'me'){
        res.redirect('me-referring-mp-name')
    }else if (userRole == 'ap' && completeAfterDeath === 'true'){
        res.redirect('cya-death-circumstances') 
    }else{
    res.redirect('implant')}
});

// What is the full name of the referring medical practioner (ME CERT)
router.post(/name-of-referring-mp/, (req,res) => {
      // grab value from the data store
    let completeAfterDeath = req.session.data.afterDeathComplete
      // if the journey is complete send back to the 'check-your-details' page
    if (completeAfterDeath === 'true') {
    res.redirect('cya-death-circumstances')
    } else {
    res.redirect('me-coroner-name')
    }
});

// What is the senior coroners full name (ME CERT)
router.post(/me-coroner-name/, (req, res) => {
    // grab value from the data store
        let completeAfterDeath = req.session.data.afterDeathComplete
    // if the journey is complete send back to the 'check-your-details' page
        if (completeAfterDeath === 'true') {
        res.redirect('cya-death-circumstances')
        } else {
    res.redirect('implant')}
});


// Was any implant placed in the body which may become hazardous when the body is cremated?
router.post(/implant/, (req, res) => {

    const implant = req.session.data['implant']

    if (implant == 'Yes') {
        res.redirect('implant-removed')
    } else {
        res.redirect('cya-death-circumstances')
    }

});

// Has the implant/s been removed?
router.post(/has-been-removed/, (req, res) => {
    res.redirect('cya-death-circumstances')
});

// Check your answers
router.post(/check-your-answers-aad/, (req, res) => {
    req.session.data['afterDeathComplete'] = 'true';
    res.redirect('mccd-tasklist');
});

// ************************************************************
// Cause of death section
// ************************************************************


// What caused the death?
router.post(/cause-of-death/, (req, res) => {

    const overUnder28 = req.session.data['over-under-28']

    if (overUnder28 == 'no') {
        res.redirect('caused-by-employment');
    } else {
        res.redirect('cya-cause-death');
    }

});

// Could the deceased person's job have caused or contributed to their death?
router.post(/caused-by-employment/, (req, res) => {
    res.redirect('pregnant-at-death')
});

// Was the deceased pregnant within the year prior to their death?
router.post(/pregnant-at-death/, (req, res) => {

    const notPregnant = req.session.data['pregnant-at-death']
    if (notPregnant == 'Not pregnant') {
        res.redirect('cya-cause-death')
    } else if (notPregnant == 'Not applicable') {
        res.redirect('cya-cause-death')
    } else {
    res.redirect('pregnancy-contributed')
    }
});

// Could the pregnancy have contributed to their death?
router.post(/pregnancy-contributed/, (req, res) => {
    res.redirect('cya-cause-death')
});

// Check your answers
router.post(/check-your-answers-cod/, (req, res) => {
    req.session.data['causeDeathComplete'] = 'true'
    res.redirect('mccd-tasklist');
});


// ************************************************************


// ************************************************************
// Notice to informant
// Where do you need to send the notice to informant?

// Removed from V10 until further discussion
// on where the Notice to Informant should live

//router.post(/notice-to-informant/, (req, res) => {
//  res.redirect('cya-emails')
//}); 


// ************************************************************
// Postcode Lookup - registration, hospital and known address
// ************************************************************

// Registration
router.get(/postcode-lookup/, (req, res) => {

    // Get the 'postcode' data from the submitted form
    var postcodeLookup = req.session.data['postcode']

    // Define a 'regular expression' to validate the postcode format
    const regex = RegExp('^([A-PR-UWYZa-pr-uwyz](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Ya-hk-y][0-9]([0-9]|[ABEHMNPRVWXY])?)) ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2})$', 'i');

    // Check if 'postcodeLookup' has a value
    if (postcodeLookup) {

        // Check if the 'postcodeLookup' matches the specified 'regular expression'
        if (regex.test(postcodeLookup) === true) {

            // Make an HTTP GET request to an external API (OS UK) to retrieve address data based on the postcode
            axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key=" + process.env.POSTCODEAPIKEY)
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

// =======================================================

// Hospital address
router.get(/hospital-lookup/, (req, res) => {

    // https://osdatahub.os.uk/docs/places/gettingStarted

    // Get the 'hospital-postcode' or 'hospital-name' data from the submitted form
    const postcodeLookup = req.session.data['hospital-postcode'];
    const hospitalName = req.session.data['hospital-name'];

    // Get the vars ready
    let queryString, url;

    // Define a 'regular expression' to validate the postcode format
    const regex = RegExp('^([A-PR-UWYZa-pr-uwyz](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Ya-hk-y][0-9]([0-9]|[ABEHMNPRVWXY])?)) ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2})$', 'i');

    if (postcodeLookup && regex.test(postcodeLookup)) {
    
        queryString = postcodeLookup;
        url = 'https://api.os.uk/search/places/v1/postcode?postcode=';
    
    } else if ( hospitalName && hospitalName.trim().length > 2 ) {

        queryString = hospitalName;
        url = 'https://api.os.uk/search/places/v1/find?maxresults=10&query=';

    }

    // Check if we have found a query string
    if ( queryString ) {

        req.session.data.queryString = queryString;

        // Make an HTTP GET request to an external API (OS UK) to retrieve address data based on the query string
        axios.get(url + encodeURI(queryString) + "&key=" + process.env.POSTCODEAPIKEY)
            .then(response => {
                // Extract and map the addresses from the API response
                var hospitalAddresses = response.data.results.map(result => result.DPA.ADDRESS);

                // Format the addresses in title case
                const titleCaseAddresses = hospitalAddresses.map(hospitalAddress => {
                    const parts = hospitalAddress.split(', ');
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
                req.session.data['hospitalAddresses'] = titleCaseAddresses;

                // Redirect to the 'Select Address' page
                if (Array.isArray(titleCaseAddresses) && titleCaseAddresses.length > 0) {
                    res.redirect('select-hospital-address')
                } else {
                    res.redirect('no-address-found')
                }

            })
            .catch(error => {
                console.log(JSON.stringify(error));
                // Redirect in case of an error
                res.redirect('no-address-found')
            });

    } else {
        // Redirect if 'queryString' is empty
        res.redirect('hospital-postcode')
    }


    //req.session.data['hospitalAddresses'] = ['Hospital address 01','Hospital address 02','Hospital address 03'];
    //res.redirect('select-hospital-address')

});

router.post( /select-hospital-address/, (req, res) => {

    req.session.data.addressPath = 'hospital';
    res.redirect('confirm-address')


});

// Confirm hospital address
router.post(/select-hospital-address/, (req, res) => {
    res.redirect('confirm-address')
});


// CYA Deceased
router.post(/confirm-address/, (req, res) => {
    res.redirect('../cya-deceased')
});

// =======================================================

// Non hospital address
router.get(/another-location-lookup/, (req, res) => {

    // Get the 'postcode' data from the submitted form
    var postcodeLookup = req.session.data['another-location-postcode']

    // Define a 'regular expression' to validate the postcode format
    const regex = RegExp('^([A-PR-UWYZa-pr-uwyz](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Ya-hk-y][0-9]([0-9]|[ABEHMNPRVWXY])?)) ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2})$', 'i');

    // Check if 'postcodeLookup' has a value
    if (postcodeLookup) {

        // Check if the 'postcodeLookup' matches the specified 'regular expression'
        if (regex.test(postcodeLookup) === true) {

            req.session.data.queryString = postcodeLookup;

            // Make an HTTP GET request to an external API (OS UK) to retrieve address data based on the postcode
            axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key=" + process.env.POSTCODEAPIKEY)
                .then(response => {
                    // Extract and map the addresses from the API response
                    var anotherAddresses = response.data.results.map(result => result.DPA.ADDRESS);

                    // Format the addresses in title case
                    const titleCaseAddresses = anotherAddresses.map(anotherAddress => {
                        const parts = anotherAddress.split(', ');
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
                    req.session.data['anotherAddresses'] = titleCaseAddresses;

                    // Redirect to the 'Select Address' page
                    res.redirect('select-another-address')
                })
                .catch(error => {
                    // Redirect in case of an error
                    res.redirect('no-address-found')
                });

        }

    } else {
        // Redirect if 'postcodeLookup' is empty
        res.redirect('another-location-postcode')
    }

})

// ************************************************************

// ME Review 

router.get(/me-decision/, (req, res) => {
const meApproveReject = req.session.data['me-decision']
if (meApproveReject == 'approve') {
    res.redirect('me-declaration')
} else {
    res.redirect('me-mccd-reviewed')
}
});

router.get(/me-declaration-scrutiny/, (req, res) => {
    res.redirect('me-mccd-reviewed')
});

// ************************************************************

// AP Amending MCCD
router.post(/ap-mccd-summary/, (req, res) => {
    res.redirect('confirmation')

});

// ************************************************************


// ************************************************************

// NHS - Care ID

router.post(/care-id-select/, (req, res) => {
    const careID = req.session.data['care-id-method']
    res.redirect('care-id-authentication')
});

router.post(/care-id-authentication/, (req, res) => {
    res.redirect('care-id-code')
});

router.post(/care-id-code/, (req, res) => {

    // If there's only one option for role, select it and skip the role page...
    if( req.session.data.user.role.length === 1 ){
        req.session.data['role-type'] = req.session.data.user.role[0];
        req.session.data.loggedIn = 'true';
        res.redirect('../dashboard');
    } else {
        res.redirect('care-id-role');
    }

});

router.post(/care-id-authentication/, (req,res) => {
    res.redirect('/v10/dashboard?role-type=ap')
});

router.post(/care-id-key/, (req,res) => {
    res.redirect('/v10/dashboard?role-type=ap')
});

router.post(/care-id-windows/, (req,res) => {
    res.redirect('/v10/dashboard?role-type=ap')
});

router.post(/care-id-smartcard/, (req,res) => {
    res.redirect('/v10/dashboard?role-type=ap')
});

// ************************************************************

// BACK TO DASHBOARD
router.post( /care-id-role/, (req, res) => {

    const roleType = req.session.data['role-type'];

    if( roleType === 'ap' || roleType === 'me' ){

        if( !req.session.data['qualifications'] ){

             // Do they have a qualifications value set?
            res.redirect('../onboarding/qualifications');

        } else if( !req.session.data['contact-method'] ){

            // Do they have a contact-method value set?
            if( req.session.data.showContactMethodScreen === 'true' ){
                res.redirect('../onboarding/contact-method');
            } else {
                res.redirect('../dashboard');
            }

        } else {
            res.redirect('../dashboard');
        }
       
    } else {
        res.redirect('../dashboard');
    }
     
    

});


// QUALIFCATIONS
router.post( /qualifications/, (req, res) => {
    
    if( req.session.data['onboardingPath'] ){
        
        if( !req.session.data['contact-method'] ){

           // Do they have a contact-method value set?
           if( req.session.data.showContactMethodScreen === 'true' ){
                res.redirect('../onboarding/contact-method');
            } else {
                res.redirect('../dashboard');
            }

        } else {
            res.redirect('../dashboard');
        }
        
    } else {
        res.redirect('../confirm-your-details');
    }

});

// CONTACT METHOD
router.post( /contact-method/, (req, res) => {
    
    if( req.session.data['onboardingPath'] ){
        delete req.session.data['onboardingPath'];
        res.redirect('../dashboard');
    } else {
        res.redirect('../confirm-your-details');
    }

});

// MCCD SUMMARY
router.post( /mccd-summary/, (req, res) => {

    switch( req.session.data['role-type'] ){

        case 'ap':
        case 'me':

             if( req.session.data['me-signoff'] === 'amend' ){

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



// MCCD TASKLIST
router.post( /mccd-tasklist/, (req, res) => {

    // This variable is set in the session data and allows you to toggle the requirement to have filled out the entire form...
    if( req.session.data.requireAllTaskListSections === 'false' ){

        res.redirect('confirm-your-details');

    } else {

        // Need everything there to proceed
        if( req.session.data.deceasedComplete && req.session.data.afterDeathComplete && req.session.data.causeDeathComplete  ){

            // This variable lets the declaration page know that it's an ME MCCD 
            if( req.session.data['role-type'] === 'me' ){
                req.session.data['me-mccd'] = 'true';
            }

            delete req.session.data.showTaskListError;

            res.redirect('confirm-your-details');


        } else {

            res.redirect('mccd-tasklist?showTaskListError=true');

        }

    }
    
    

});


// DECLARATION
router.post( /declaration/, (req, res) => {
    res.redirect('confirmation');
});

// FEEDBACK
router.get( [
    '/onboarding/feedback',
    '/auth/feedback',
    '/ethnicity/feedback',
    '/me-registration/feedback',
    '/MFA/feedback',
    '/neo-natal-deaths/feedback',
    '/onboarding/feedback',
    '/place-of-death/feedback'], (req, res) => {
    res.redirect('/V10-1/feedback');
    next();
});

// CONFIRMATION
router.post( /confirmation/, (req, res) => {

    delete req.session.data['ap-cert-declaration'];
    delete req.session.data['me-cert-declaration'];
    delete req.session.data['me-scrutiny-declaration'];
    delete req.session.data['meo-scrutiny-declaration'];

    delete req.session.data['me-signoff'];
    delete req.session.data['give-feedback'];
    delete req.session.data['feedback-text'];

    delete req.session.data['me-mccd'];
    delete req.session.data['sent-to-registrar'];

    res.redirect('feedback-confirmation');

});

module.exports = router;


// The URL here needs to match the URL of the page that the user is on
// when they type in their email address
router.post('/email-address-page', function (req, res) {

    if( notify ){
        notify.sendEmail(
        // this long string is the template ID, copy it from the template
        // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
        // in your code.
        'f9cd32e9-af3c-495a-86f0-59d157c25c22',
        // `emailAddress` here needs to match the name of the form field in
        // your HTML page
        req.body.emailAddress
        );
    }
  
    // This is the URL the users will be redirected to once the email
    // has been sent
    res.redirect('dashboard');
  
  });