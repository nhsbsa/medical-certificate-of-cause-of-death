// ************************************************************
// CURRENT VERSION
// ************************************************************

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// External dependencies
const axios = require('axios');

// ************************************************************
// MFA set up
// ************************************************************

// Email example screen
router.post( /account-created-email/, (req, res) => {

    req.session.data['account-creation-journey'] = 'active'
    res.redirect('../index')

});

// Sign in
router.post( /login-page/, (req, res) => {

    const accountCreationJourney = req.session.data['account-creation-journey']

    if (accountCreationJourney == 'active') {
        res.redirect('../MFA/set-password')
    } else {
        res.redirect('../auth/enter-code')
    }

});

// Set your password
router.post( /set-password/, (req, res) => {
    res.redirect('set-up-authenticator')
});

// Set up your account with an authentication app   
router.post( /set-up-authenticator/, (req, res) => {

    const authType = req.session.data['radioGroupAuth']

    if (authType == 'desktop') {
        res.redirect('enter-key');
    } else {
        res.redirect('get-security-code');
    }

});

// Finish set up
router.post( /auth-setup/, (req, res) => {
    res.redirect('done')
});

// ************************************************************
// Medical Examiner Registration Journey
// ************************************************************

router.post( /role-assignment/, (req, res) => {

    const roleType = req.session.data['role-type']
    res.redirect('your-name')

});

router.post( /me-full-name/, (req, res) => {
    res.redirect('me-gmc-number')
});

router.post( /me-gmc-number/, (req, res) => {
    res.redirect('primary-qualification')
});

router.post( /primary-qualification/, (req, res) => {
    res.redirect('where-do-you-work')
});

router.post( /manual-work-address/, (req, res) => {
    res.redirect('details-cya')
});

router.post( /me-email-address/, (req, res) => {
    res.redirect('../MFA/set-password')
});


// ************************************************************
// SIGN IN 
// ************************************************************

// Sign in page
router.post( /login-page/, (req, res) => {
    res.redirect('enter-code')
});

// Enter authentication code for login
router.post( /enter-code/, (req, res) => {
    res.redirect('66-or-65')
});

// ***************************************************************************************************
// MCCD Creation flow
// ***************************************************************************************************


// Was the death more than 28 days after the birth?
router.post( /66-or-65/, function (req, res) {
  // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('cya-deceased')
  } else {
    res.redirect('nhs-number')}
});

// What is the deceased persons NHS Number
router.post( /nhs-number/, function (req, res) {
    // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('cya-deceased')
  } else {
    res.redirect('name-of-the-deceased')}
});

// What is the deceased person's name?
router.post( /name-of-the-deceased/, (req, res) => {
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
router.post( /date-of-birth/, (req, res) => {

    const completeDeceased = req.session.data.deceasedComplete;
    const overUnder28 = req.session.data['over-under-28'];

    console.log( overUnder28 );

    if( completeDeceased === 'true' ){
        // Back to CYA
        res.redirect('cya-deceased');
    } else {
        if( overUnder28 === 'dpd66Or65RadioYes' ){
            // Infant
            res.redirect('neo-natal-deaths/location-born');
        } else {
            // Adult
            res.redirect('age-66');
        }
    }

});

// Under 28 - Location of birth > Age
router.post( /location-born/, (req, res) => {
      // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('/V11bi/cya-deceased')
  } else {
    res.redirect('triage-24-hours')
  }
});

router.post( /triage-24-hours/, (req, res) => {
    res.redirect('deceased-persons-age')
});


// What is their ethnicity?

// Over 28
router.post( /age-66/, (req, res) => {
    
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
router.post( /deceased-persons-age/, (req, res) => {
          // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('/V11bi/cya-deceased')
  } else {
    res.redirect('/V11bi/ethnicity/ethnic-group')
  }
});

router.post( /age-65-hours/, (req, res) => {
              // grab value from the data store
  let completeDeceased = req.session.data.deceasedComplete
  // if the journey is complete send back to the 'check-your-details' page
  if (completeDeceased === 'true') {
    res.redirect('/V11bi/cya-deceased')
  } else {
    res.redirect('ethnicity/ethnic-group')
  }
});

router.post( /ethnic-group/, (req,res) => {
    
    var ethnicGroup = req.session.data['ethnic-group'];

    if (ethnicGroup === 'dpdEthnicGroupWhite' ){
        res.redirect('ethnicity-white');

    } else if (ethnicGroup === 'dpdEthnicGroupMixedOrMultiple' ){
        res.redirect('ethnicity-mixed');

    } else if (ethnicGroup === 'dpdEthnicGroupAsianOrAsianBritish' ){
        res.redirect('ethnicity-asian');

    } else if (ethnicGroup === 'dpdEthnicGroupBlackAfricanCaribbeanOrBlackBritish' ){
        res.redirect('ethnicity-black');

    } else if (ethnicGroup === 'dpdEthnicGroupUnknown'){
        res.redirect('../date-of-death');

    } else {
        res.redirect('ethnicity-other');

    }

});

// What is their date of death?
router.post( /ethnicity/, (req, res) => {
              // grab value from the data store
        let completeDeceased = req.session.data.deceasedComplete
        // if the journey is complete send back to the 'check-your-details' page
        if (completeDeceased === 'true') {
            res.redirect('/V11bi/cya-deceased')
        } else {
            res.redirect('../date-of-death')
        }
});

// Was the death in a hospital?
router.post( /date-of-death/, (req, res) => {
    let completeDeceased = req.session.data.deceasedComplete
    // if the journey is complete send back to the 'check-your-details' page
    if (completeDeceased === 'true') {
      res.redirect('cya-deceased')
    } else {
        res.redirect('death-hospital')
    }
});

// Hospital - postcode lookup
router.post( /death-hospital/, (req, res) => {

    const deathHospital = req.session.data['death-in-hospital'];

    if ( deathHospital === 'globalRadioYes' ) {
        res.redirect('place-of-death/hospital-postcode');
    } else {
        res.redirect('place-of-death/location-of-death');

    }
});

// Hospital - select address

router.post( /hospital-postcode/, (req, res) => {
    res.redirect('select-hospital-address');

});

// Another location - postcode lookup
router.post( /location-of-death/, (req, res) => {

    const locationDeathKnown = req.session.data['location-of-death'];

    if (locationDeathKnown === 'globalRadioNo') {
        res.redirect('unknown-address');
    } else {
        res.redirect('another-location-postcode');
    }

});

// Exact address
router.post( /death-location/, (req, res) => {
    res.redirect('../cya-deceased')
});

// CYA - Deceased person's details
router.post( /select-hospital-address/, (req, res) => {
    res.redirect('../cya-deceased')

});

router.post( /unknown-address/, (req, res) => {
    res.redirect('../cya-deceased')
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
router.post( /death-circumstances/, (req, res) => {
  
    let completeAfterDeath = req.session.data.afterDeathComplete;

    if (completeAfterDeath === 'true') {
      res.redirect('cya-death-circumstances');
    } else {
      res.redirect('box-b');
    }

});

// Box B [ONS requirement]
router.post( /box-b/, (req, res) => {

    let completeAfterDeath = req.session.data.afterDeathComplete;
    var userRole = req.session.data['role-type'];

    if( completeAfterDeath === 'true'){
        res.redirect('cya-death-circumstances');
    } else {
        if( userRole == 'me' ){
            res.redirect('me-referring-mp-name');
        } else {
            res.redirect('implant');
        }
    }
    
});

// What is the full name of the referring medical practioner (ME CERT)
router.post( /name-of-referring-mp/, (req,res) => {

    let completeAfterDeath = req.session.data.afterDeathComplete;
      
    if (completeAfterDeath === 'true') {
        res.redirect('cya-death-circumstances');
    } else {
        res.redirect('me-coroner-name');
    }

});

// What is the senior coroners full name (ME CERT)
router.post( /me-coroner-name/, (req, res) => {
    // grab value from the data store
        let completeAfterDeath = req.session.data.afterDeathComplete
    // if the journey is complete send back to the 'check-your-details' page
        if (completeAfterDeath === 'true') {
        res.redirect('cya-death-circumstances')
        } else {
    res.redirect('implant')}
});


// Was any implant placed in the body which may become hazardous when the body is cremated?
router.post( /implant/, (req, res) => {

    const implant = req.session.data['implant'];
    let completeAfterDeath = req.session.data.afterDeathComplete;

    if( completeAfterDeath === 'true') {
        res.redirect('cya-death-circumstances')
    } else {
        if (implant === 'globalRadioYes') {
            res.redirect('implant-removed');
        } else {
            res.redirect('cya-death-circumstances');
        }
    }
    

});

// Has the implant/s been removed?
router.post( /has-been-removed/, (req, res) => {
    res.redirect('cya-death-circumstances');
});

// Check your answers (Actions After Death)
router.post( /check-your-answers-aad/, (req, res) => {
    req.session.data['afterDeathComplete'] = 'true';
    res.redirect('mccd-tasklist');
});

// ************************************************************
// Cause of death section
// ************************************************************


// What caused the death?
router.post( /cause-of-death/, (req, res) => {

    const overUnder28 = req.session.data['over-under-28'];
    const completeCauseDeath = req.session.data.causeDeathComplete;
    
    if( completeCauseDeath === 'true') {
        // Back to CYA
        res.redirect('cya-cause-death');
    } else {
        if (overUnder28 === 'dpd66Or65RadioNo') {
            // Adult
            res.redirect('caused-by-employment');
        } else {
            // Infant
            res.redirect('cya-cause-death');
        }
    }

});

// Could the deceased person's job have caused or contributed to their death?
router.post( /caused-by-employment/, (req, res) => {
    // grab value from the data store
    let completeCauseDeath = req.session.data.causeDeathComplete
// if the journey is complete send back to the 'check-your-details' page
    if (completeCauseDeath === 'true') {
    res.redirect('cya-cause-death')
    }else{
    res.redirect('pregnant-at-death')}
});

// Was the deceased pregnant within the year prior to their death?
router.post( /pregnant-at-death/, (req, res) => {

    let notPregnant = req.session.data['pregnant-at-death'];
    if (notPregnant == 'Pregnant at time of death' || 'Yn feichiog ar adeg marwolaeth' || 'Pregnant 1 to 42 days before death' || 'Yn feichiog 1 i 42 diwrnod cyn marwolaeth' || 'Pregnant 43 days to a year before death' || 'Yn feichiog 43 diwrnod i flwyddyn cyn marwolaeth') {
        res.redirect('pregnancy-contributed');
    } else if (notPregnant == 'Not applicable' || 'Ddim yn berthnasol' || 'Not pregnant' || 'Ddim yn feichiog') {
        res.redirect('cya-cause-death');
    } else {
    res.redirect('pregnancy-contributed');
    }
});

// Could the pregnancy have contributed to their death?
router.post( /pregnancy-contributed/, (req, res) => {
    res.redirect('cya-cause-death');
});

// Check your answers
router.post( /check-your-answers-cod/, (req, res) => {
    req.session.data['causeDeathComplete'] = 'true';
    res.redirect('mccd-tasklist');
});

router.post( /give-feedback/, (req, res) => {
    res.redirect('dashboard')
});


// ************************************************************


// ************************************************************
// Notice to informant
// Where do you need to send the notice to informant?

// Removed from V10 until further discussion
// on where the Notice to Informant should live

//router.post( /notice-to-informant/, (req, res) => {
//  res.redirect('cya-emails')
//}); 


// ************************************************************
// Postcode Lookup - registraion, hospital and known address
// ************************************************************

// Registraion
router.get( /postcode-lookup/, (req, res) => {

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
                    res.redirect('select-another-address')
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

router.post( /select-another-address/, (req, res) => {
    res.redirect('details-cya')
});

// =======================================================

// Hospital address
router.get( /hospital-lookup/, (req, res) => {

    // Get the 'postcode' data from the submitted form
    var postcodeLookup = req.session.data['hospital-postcode'];


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
                    if( Array.isArray(titleCaseAddresses) && titleCaseAddresses.length > 0 ){
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

                //req.session.data['hospitalAddresses'] = ['Hospital address 01','Hospital address 02','Hospital address 03'];
                res.redirect('select-hospital-address')
        }

    } else {
        // Redirect if 'postcodeLookup' is empty
        res.redirect('hospital-postcode')
    }

})

router.post( /select-hospital-address/, (req, res) => {
    res.redirect('cya-deceased')
});

// =======================================================

// Non hospital address
router.get( /another-location-lookup/, (req, res) => {

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

                

                //req.session.data['anotherAddresses'] = ['Another address 01','Another address 02','Another address 03'];
                res.redirect('select-another-address')

        }

    } else {
        // Redirect if 'postcodeLookup' is empty
        res.redirect('another-location-postcode')
    }

})

router.post( /select-hospital-address/, (req, res) => {
    res.redirect("/cya-deceased")
});

// ************************************************************

// ME Review 

router.get( /me-decision/, (req, res) => {
const meApproveReject = req.session.data['me-decision']
if (meApproveReject == 'approve') {
    res.redirect('me-declaration')
} else {
    res.redirect('me-mccd-reviewed')
}
});

router.get( /me-declaration-scrutiny/, (req, res) => {
    res.redirect('me-mccd-reviewed')
});


// ************************************************************

// NHS - Care ID

router.post( /care-id-select/, (req, res) => {
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

router.post( /care-id-authentication/, (req, res) => {
    res.redirect('care-id-code')
});

router.post( /care-id-code/, (req, res) => {
    res.redirect('care-id-role')
});

router.post( /care-id-authentication/, (req,res) => {
    res.redirect('../dashboard')
});

router.post( /care-id-key/, (req,res) => {
    res.redirect('../dashboard')
});

router.post( /care-id-windows/, (req,res) => {
    res.redirect('../dashboard')
});

router.post( /care-id-smartcard/, (req,res) => {
    res.redirect('../dashboard')
});



// ************************************************************





// BACK TO DASHBOARD
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
        res.redirect('confirm-your-details');
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

    // Need everything there to proceed
    if( req.session.data.deceasedComplete && req.session.data.afterDeathComplete && req.session.data.causeDeathComplete  ){

        // This variable lets the declaration page know that it's an ME MCCD 
        if( req.session.data['role-type'] === 'me' ){
            req.session.data['me-mccd'] = true;
        }

        delete req.session.data.showTaskListError;

        res.redirect('confirm-your-details');


    } else {

        res.redirect('mccd-tasklist?showTaskListError=true');

    }
    
    

});


// DECLARATION
router.post( /declaration/, (req, res) => {
    res.redirect('confirmation');
});

// CONFIRMATION
router.post( /confirmation/, (req, res) => {

    // This clears all the possible 

    delete req.session.data['ap-cert-declaration'];
    delete req.session.data['me-cert-declaration'];
    delete req.session.data['me-scrutiny-declaration'];
    delete req.session.data['meo-scrutiny-declaration'];

    delete req.session.data['me-signoff'];
    delete req.session.data['give-feedback'];
    delete req.session.data['feedback-text'];

    delete req.session.data['me-mccd'];
    delete req.session.data['sent-to-registrar'];

    res.redirect('dashboard');

});



module.exports = router;