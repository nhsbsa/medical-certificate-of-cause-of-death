// ************************************************************
// CURRENT VERSION
// ************************************************************

let version = 'V11';

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// External dependencies
const axios = require('axios')


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
        res.redirect('../auth/enter-code')
    }

});

// Set your password
router.post(/set-password/, (req, res) => {
    res.redirect('set-up-authenticator')
});

// Set up your account with an authentication app   
router.post(/set-up-authenticator/, (req, res) => {

    const authType = req.session.data['radioGroupAuth']

    if (authType == 'desktop') {
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
// Medical Examiner Registration Journey
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

router.post(/manual-work-address/, (req, res) => {
    res.redirect('details-cya')
});

router.post(/me-email-address/, (req, res) => {
    res.redirect('../MFA/set-password')
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

// Qualification set

router.post( /care-id-role/, (req, res) => {
    
    const roleType = req.session.data['role-type'];
    
    if( !req.session.data['qualifications'] ){
        if( roleType === 'ap' || roleType === 'me' ){
            res.redirect('../qualifications');
        } else {
            res.redirect('../dashboard');
        }
    } else {
        res.redirect('../dashboard');
        
    }

});

// QUALIFCATIONS
router.post( /qualifications/, (req, res) => {
    
    if( req.session.data['return-to-dashboard'] ){
        delete req.session.data['return-to-dashboard'];
        res.redirect('dashboard');
    } else {
        res.redirect('confirm-details');
    }

});
// ***************************************************************************************************
// MCCD Creation flow
// ***************************************************************************************************

// Set journey as complete
router.get('/cya-deceased', function (req, res) {
    // set data store variable
    req.session.data.deceasedComplete = 'true'
    // render the page
    return res.render('/V11/cya-deceased')
  })

// Was the death more than 28 days after the birth?
router.post("/66-or-65", function (req, res) {
  // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('cya-deceased')
  } else {
    res.redirect('nhs-number')}
});

// What is the deceased persons NHS Number
router.post("/nhs-number", function (req, res) {
    // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('cya-deceased')
  } else {
    res.redirect('name-of-the-deceased')}
});

// What is the deceased person's name?
router.post(/name-of-the-deceased/, (req, res) => {
    // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('cya-deceased')
  } else {
    res.redirect('date-of-birth')}
});

// What was the deceased persons age?

    // If Over 28 > Age
router.post(/date-of-birth/, (req, res) => {
    // grab value from the data store
    let completeDeceased = req.session.data.deceasedComplete
    const overUnder28 = req.session.data['over-under-28']
    
    if (overUnder28 == 'no' && completeDeceased === 'true') {
        res.redirect('cya-deceased')
    } else if (overUnder28 == 'no') {
        res.redirect('age-66')

    // If Under 28 > Location of birth

    } else if (overUnder28 == 'yes' && completeDeceased === 'true') { 
        res.redirect('cya-deceased') 
    } else {
        res.redirect('neo-natal-deaths/location-born')

    }
});

// Under 28 - Location of birth > Age
router.post(/location-born/, (req, res) => {
      // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('/v11/cya-deceased')
  } else {
    res.redirect('triage-24-hours')
  }
});

router.post(/triage-24-hours/, (req, res) => {
    res.redirect('deceased-persons-age')
});


// What is their ethnicity?

// Over 28
router.post(/age-66/, (req, res) => {
          // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('cya-deceased')
  } else {
    res.redirect('ethnicity/ethnic-group')
  }
});

// Under 28
router.post(/deceased-persons-age/, (req, res) => {
          // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('/v11/cya-deceased')
  } else {
    res.redirect('/V11/ethnicity/ethnic-group')
  }
});

router.post(/age-65-hours/, (req, res) => {
              // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('/v11/cya-deceased')
  } else {
    res.redirect('ethnicity/ethnic-group')
  }
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
              // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('/v11/cya-deceased')
  } else {
    res.redirect('../date-of-death')
  }
});

// Was the death in a hospital?
router.post(/date-of-death/, (req, res) => {
    let completeDeceased = req.session.data.deceasedComplete
    // if the journey is complete send back to the 'check-your-details' page
    if (completeDeceased === 'true') {
      res.redirect('cya-deceased')
    } else {
    res.redirect('death-hospital')
    }
});

// Hospital - postcode lookup
router.post(/death-hospital/, (req, res) => {

    const DeathHospital = req.session.data['death-in-hospital']

    if (DeathHospital == 'yes') {
        res.redirect('hospital-postcode')
    } else {
        res.redirect('location-of-death')

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
    res.redirect('cya-deceased')
    
});

// CYA - Deceased person's details
router.post(/select-hospital-address/, (req, res) => {
    res.redirect('cya-deceased')

});

router.post(/unknown-address/, (req, res) => {
    res.redirect('cya-deceased')

});

// ************************************************************
// Actions after death section
// ************************************************************

// Set journey as complete
router.get('/cya-death-circumstances', function (req, res) {
    // set data store variable
    req.session.data.afterDeathComplete = 'true'
    // render the page
    return res.render('/V11/cya-death-circumstances')
  })

// Has a post-mortem been held?
// AP MCCD
router.post(/death-circumstances-ap/, (req, res) => {
  // grab value from the data store
  let completeAfterDeath = req.session.data.afterDeathComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeAfterDeath === 'true') {
    res.redirect('cya-death-circumstances')
  } else {
    res.redirect('box-b')
  }
});

// Me MCCD
router.post(/death-circumstances-me/, (req, res) => {
  // grab value from the data store
  let completeAfterDeath = req.session.data.afterDeathComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeAfterDeath === 'true') {
    res.redirect('cya-death-circumstances')
  } else {
    res.redirect('box-b')
  }
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
    // grab value from the data store
    let completeAfterDeath = req.session.data.afterDeathComplete
    // if the journey is complete send back to the 'check-your-details' page
    if (completeAfterDeath === 'true') {
        res.redirect('cya-death-circumstances')
    }else if (implant == 'Yes' || implant == 'Do' ) {
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
router.post(/check-your-answers-dc/, (req, res) => {

    req.session.data['actions-after-death-section'] = 'completed'

    res.redirect('mccd-tasklist')
});

// ************************************************************
// Cause of death section
// ************************************************************

// Set journey as complete
router.get('/cya-cause-death', function (req, res) {
    // set data store variable
    req.session.data.causeDeathComplete = 'true'
    // render the page
    return res.render('/V11/cya-cause-death')
  })

// What caused the death?
router.post(/cause-of-death/, (req, res) => {

    const overUnder28 = req.session.data['over-under-28']
// grab value from the data store
    let completeCauseDeath = req.session.data.causeDeathComplete
// if the journey is complete send back to the 'check-your-details' page
    if (overUnder28 == 'no' && completeCauseDeath === 'true') {
    res.redirect('cya-cause-death')
    }
    else if (overUnder28 == 'no') {
        res.redirect('caused-by-employment')
    } else {
        res.redirect('cya-cause-death')
    }

});

// Could the deceased person's job have caused or contributed to their death?
router.post(/caused-by-employment/, (req, res) => {
    // grab value from the data store
    let completeCauseDeath = req.session.data.causeDeathComplete
// if the journey is complete send back to the 'check-your-details' page
    if (completeCauseDeath === 'true') {
    res.redirect('cya-cause-death')
    }else{
    res.redirect('pregnant-at-death')}
});

// Was the deceased pregnant within the year prior to their death?
router.post(/pregnant-at-death/, (req,res) => {
    const preggo = ['Pregnant at time of death', 'Beichiog adeg y farwolaeth', 'Pregnant 1 to 42 days before death', 'Beichiog 1 i 42 o ddiwrnodau cyn y farwolaeth', 'Pregnant 43 days to a year before death', 'Beichiog 43 o ddiwrnodau i flwyddyn cyn y farwolaeth']
    const notPreggo = ['Not applicable', 'Amherthnasol', 'Not pregnant', 'Nid oedd yn feichiog', 'Unknown', 'Anhysbys']
    var pregnantAtDeath = req.session.data['pregnant-at-death']
    if (preggo.includes(pregnantAtDeath)) {
        res.redirect('pregnancy-contributed')
    }
    if (notPreggo.includes(pregnantAtDeath)) {
        res.redirect('cya-cause-death')
    }
})

// Could the pregnancy have contributed to their death?
router.post(/pregnancy-contributed/, (req, res) => {
    res.redirect('cya-cause-death')
});

// Check your answers
router.post(/check-your-answers-cod/, (req, res) => {

    req.session.data['cause-of-death-section'] = 'completed'

    res.redirect('mccd-tasklist')
});

// ************************************************************
// Declaration
// ************************************************************



// const qualification = 

// Add qualification
router.post(/qualifications/, (req,res) =>{
    res.redirect('confirm-details')
});

// Declaration page [AP]

router.post(/ap-declaration/, (req, res) => {
    res.redirect('confirmation')
});
router.post(/confirmation/, (req, res) => {
    res.redirect('dashboard?role-type=ap')
});

router.post(/give-feedback/, (req, res) => {
    res.redirect('dashboard')
});

// Declaration page [ME Cert]

router.post(/me-cert-declaration/, (req, res) => {
    res.redirect('confirmation')
});
router.post(/confirmation/, (req, res) => {
    res.redirect('dashboard?role-type=me')
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
// Postcode Lookup - registraion, hospital and known address
// ************************************************************

// Registraion
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

    // Get the 'postcode' data from the submitted form
    var postcodeLookup = req.session.data['hospital-postcode']

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
                    res.redirect('select-hospital-address')
                })
                .catch(error => {
                    // Redirect in case of an error
                    res.redirect('no-address-found')
                });

        }

    } else {
        // Redirect if 'postcodeLookup' is empty
        res.redirect('hospital-postcode')
    }

})

router.post(/select-hospital-address/, (req, res) => {
    res.redirect('cya-deceased')
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

router.post(/select-hospital-address/, (req, res) => {
    res.redirect("/cya-deceased")
});

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
    res.redirect('declaration')

});

// ************************************************************


// ************************************************************

// NHS - Care ID

router.post(/care-id-select/, (req, res) => {
    const careID = req.session.data['care-id-method']
    res.redirect('care-id-authentication')
    
    //if (careID == 'Smartcard') {
      //  res.redirect('care-id-smartcard')
    //} else if (careID == 'Windows Hello') {
    //res.redirect('care-id-windows')
    //} else if (careID == 'Security Key') {
      //  res.redirect('care-id-key')
    //} else if (careID == 'Authenticator App') {
      //  res.redirect('care-id-authentication')
    //}
});

router.post(/care-id-authentication/, (req, res) => {
    res.redirect('care-id-code')
});

router.post(/care-id-code/, (req, res) => {
    res.redirect('care-id-role')
});

router.post(/care-id-role/, (req, res) => {
    res.redirect('../dashboard?role-type=ap')
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


// ************************
// MEO 


router.post(/meo-review/, (req,res) => {
    res.redirect('meo-confirmation')
});

router.post(/joseph-review/, (req,res) => {
    res.redirect('meo-confirmation')
});

router.post(/milo-review/, (req,res) => {
    res.redirect('meo-confirmation')
});

router.post(/select-reg-office/, (req,res) => {
    res.redirect('cya-share-mccd')
});

router.post(/cya-share-mccd/, (req,res) => {
    res.redirect('meo-confirmation')
});








// ************************************************************



module.exports = router;