[
    {
    "id": "MCCD-V0-1",
    "viewports": [
        {
            "label": "desktop",
            "width": 1000,
            "height": 730
        }
    ],
    "onBeforeScript": "puppet/onBefore.js",
    "onReadyScript": "puppet/onReady.js",
    "scenarios": [
        {
            "label": "gov-uk-start",
            "url": "http://localhost:3000/V10-1/govuk-start"
        },
        {
            "label": "service-start",
            "url": "http://localhost:3000/V10-1/index"
        },
        {
            "label": "auth-care-id-select-method",
            "url": "http://localhost:3000/V10-1/auth/care-id-select"
        },
        {
            "label": "auth-care-id-email",
            "url": "http://localhost:3000/V10-1/auth/care-id-authentication"
        },
        {
            "label": "auth-care-id-code",
            "url": "http://localhost:3000/V10-1/auth/care-id-code"
        },
        {
            "label": "auth-care-id-role",
            "url": "http://localhost:3000/V10-1/auth/care-id-role"
        },
        {
            "label": "ap-qualification",
            "url": "http://localhost:3000/V10-1/qualifications?return-to-dashboard=true&role-type=ap"
        },
        {
            "label": "ap-dashboard",
            "url": "http://localhost:3000/V10-1/dashboard?role-type=ap"
        },
        {
            "label": "66-65-form-triage",
            "url": "http://localhost:3000/V10-1/66-or-65?role-type=ap"            
        },
        {
            "label": "nhs-number",
            "url": "http://localhost:3000/V10-1/nhs-number?role-type=ap"            
        },
        {
            "label": "name-under-28",
            "url": "http://localhost:3000/V10-1/name-of-the-deceased?over-under-28=no&role-type=ap"            
        },
        {
            "label": "name-over-28",
            "url": "http://localhost:3000/V10-1/name-of-the-deceased?over-under-28=yes&role-type=ap"            
        },
        {
            "label": "date-of-birth",
            "url": "http://localhost:3000/V10-1/date-of-birth?role-type=ap"            
        },
        {
            "label": "place-of-birth",
            "url": "http://localhost:3000/V10-1/neo-natal-deaths/location-born?role-type=ap"            
        },
        {
            "label": "triage-24-hours",
            "url": "http://localhost:3000/V10-1/neo-natal-deaths/triage-24-hours?role-type=ap"            
        },
        {
            "label": "age-over-24-hours",
            "url": "http://localhost:3000/V10-1/neo-natal-deaths/deceased-persons-age?over-under-24=yes&role-type=ap"            
        },
        {
            "label": "age-under-24-hours",
            "url": "http://localhost:3000/V10-1/neo-natal-deaths/deceased-persons-age?over-under-24=no&role-type=ap"            
        },
        {
            "label": "age-over-28",
            "url": "http://localhost:3000/V10-1/age-66?role-type=ap"            
        },
        {
            "label": "ethnic-group",
            "url": "http://localhost:3000/V10-1/ethnic-group?role-type=ap"            
        },
        {
            "label": "ethnicity-white",
            "url": "http://localhost:3000/V10-1/ethnicity/ethnicity-white?role-type=ap"            
        },
        {
            "label": "ethnicity-mixed",
            "url": "http://localhost:3000/V10-1/ethnicity/ethnicity-mixed?role-type=ap"            
        },
        {
            "label": "ethnicity-asian",
            "url": "http://localhost:3000/V10-1/ethnicity/ethnicity-asian?role-type=ap"            
        },
        {
            "label": "ethnicity-black",
            "url": "http://localhost:3000/V10-1/ethnicity/ethnicity-black?role-type=ap"            
        },
        {
            "label": "ethnicity-other",
            "url": "http://localhost:3000/V10-1/ethnicity/ethnicity-other?role-type=ap"            
        },
        {
            "label": "date-of-death",
            "url": "http://localhost:3000/V10-1/date-of-death?role-type=ap"            
        },
        {
            "label": "triage-death-in-hospital",
            "url": "http://localhost:3000/V10-1/death-hospital?role-type=ap"            
        },
        {
            "label": "triage-address-known",
            "url": "http://localhost:3000/V10-1/place-of-death/location-of-death?role-type=ap"            
        },
        {
            "label": "hospital-address-lookup",
            "url": "http://localhost:3000/V10-1/place-of-death/hospital-postcode?role-type=ap"            
        },
        {
            "label": "community-address-lookup",
            "url": "http://localhost:3000/V10-1/place-of-death/another-location-postcode?role-type=ap"            
        },
        {
            "label": "community-unknown-address",
            "url": "http://localhost:3000/V10-1/place-of-death/unknown-address?role-type=ap"            
        },
        
        {
            "label": "select-hospital-address",
            "url": "http://localhost:3000/V10-1/place-of-death/select-hospital-address?role-type=ap"            
        },
        {
            "label": "select-community-address",
            "url": "http://localhost:3000/V10-1/place-of-death/select-another-address?role-type=ap"            
        },
        {
            "label": "confirm-address",
            "url": "http://localhost:3000/V10-1/place-of-death/confirm-address?role-type=ap"            
        },
        {
            "label": "no-address-found",
            "url": "http://localhost:3000/V10-1/place-of-death/no-address-found?role-type=ap"            
        },
        {
            "label": "exact-address-community",
            "url": "http://localhost:3000/V10-1/place-of-death/exact-address?role-type=ap"            
        },
        {
            "label": "exact-address-hospital",
            "url": "http://localhost:3000/V10-1/place-of-death/location-death-hospital?role-type=ap"            
        },
        {
            "label": "cya-deceased-details",
            "url": "http://localhost:3000/V10-1/cya-deceased?role-type=ap"            
        },
        {
            "label": "mccd-tasklist",
            "url": "http://localhost:3000/V10-1/mccd-tasklist?role-type=ap"            
        },
        {
            "label": "post-mortem",
            "url": "http://localhost:3000/V10-1/death-circumstances?role-type=ap"            
        },
        {
            "label": "additional-information-box-b",
            "url": "http://localhost:3000/V10-1/box-b?role-type=ap"            
        },
        {
            "label": "implant",
            "url": "http://localhost:3000/V10-1/implant?role-type=ap"            
        },
        {
            "label": "implant-removed",
            "url": "http://localhost:3000/V10-1/implant-removed?role-type=ap"            
        },
        {
            "label": "cya-death-circumstances",
            "url": "http://localhost:3000/V10-1/cya-death-circumstances?role-type=ap"            
        },
        {
            "label": "cause-of-death-over-28",
            "url": "http://localhost:3000/V10-1/cause-of-death?over-under-28=no&role-type=ap"            
        },
        {
            "label": "cause-of-death-under-28",
            "url": "http://localhost:3000/V10-1/cause-of-death?over-under-28=yes&role-type=ap"            
        },
        {
            "label": "caused-by-employment",
            "url": "http://localhost:3000/V10-1/caused-by-employment?role-type=ap"            
        },
        {
            "label": "pregnant-at-death",
            "url": "http://localhost:3000/V10-1/pregnant-at-death?role-type=ap"            
        },
        {
            "label": "pregnancy-contributed",
            "url": "http://localhost:3000/V10-1/pregnancy-contributed?role-type=ap"            
        },
        {
            "label": "cya-cause-death-over-28",
            "url": "http://localhost:3000/V10-1/cya-cause-death?over-under-28=no&role-type=ap"            
        },
        {
            "label": "cya-cause-death-under-28",
            "url": "http://localhost:3000/V10-1/cya-cause-death?over-under-28=yes&role-type=ap"            
        },
        {
            "label": "confirm-your-details",
            "url": "http://localhost:3000/V10-1/confirm-your-details?role-type=ap"            
        },
        {
            "label": "declaration",
            "url": "http://localhost:3000/V10-1/declaration?role-type=ap"            
        },
        {
            "label": "confirmation",
            "url": "http://localhost:3000/V10-1/confirmation?role-type=ap"            
        },
        {
            "label": "feedback-confirmation",
            "url": "http://localhost:3000/V10-1/feedback-confirmation?role-type=ap"            
        }
        
    ],
    "paths": {
        "bitmaps_reference": "backstop_data/bitmaps_reference",
        "bitmaps_test": "backstop_data/bitmaps_test",
        "engine_scripts": "backstop_data/engine_scripts",
        "html_report": "backstop_data/html_report",
        "ci_report": "backstop_data/ci_report"
    },
    "report": ["browser"],
    "engine": "puppeteer",
    "engineOptions": {
        "args": ["--no-sandbox"]
    },
    "asyncCaptureLimit": 5,
    "asyncCompareLimit": 50,
    "debug": false,
    "debugWindow": false
}
];