[
    {
    "id": "MCCD-V11",
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
            "label": "Gov-uk-start",
            "url": "http://localhost:3000/V11/govuk-start"
        },
        {
            "label": "service-start-bilingual-cy",
            "url": "http://localhost:3000/V11/index?bilingual=true&lang=cy"
        },
        {
            "label": "service-start-bilingual-en",
            "url": "http://localhost:3000/V11/index?bilingual=true&lang=en"
        },
        {
            "label": "service-start",
            "url": "http://localhost:3000/V11/index?bilingual=false"
        },
        {
            "label": "login",
            "url": "http://localhost:3000/V11/auth/login-page"
        },
        {
            "label": "login-bilingual-cy",
            "url": "http://localhost:3000/V11/auth/login-page?bilingual=true&lang=cy"
        },
        {
            "label": "login-bilingual-en",
            "url": "http://localhost:3000/V11/auth/login-page?bilingual=true&lang=en"
        },
        {
            "label": "auth-care-id-select-method",
            "url": "http://localhost:3000/V11/auth/care-id-select"
        },
        {
            "label": "auth-care-id-email",
            "url": "http://localhost:3000/V11/auth/care-id-authentication"
        },
        {
            "label": "auth-care-id-code",
            "url": "http://localhost:3000/V11/auth/care-id-code"
        },
        {
            "label": "auth-care-id-role",
            "url": "http://localhost:3000/V11/auth/care-id-role"
        },
        {
            "label": "ap-qualification",
            "url": "http://localhost:3000/V11/qualifications?return-to-dashboard=true&role-type=ap"
        },
        {
            "label": "ap-dashboard",
            "url": "http://localhost:3000/V11/dashboard?role-type=ap"
        },
        {
            "label": "ap-dashboard-bilingual-cy",
            "url": "http://localhost:3000/V11/dashboard?role-type=ap&bilingual=true&lang=cy&hasQualification=true&qualifications=MBChB"
        },
        {
            "label": "ap-dashboard-bilingual-en",
            "url": "http://localhost:3000/V11/dashboard?role-type=ap&bilingual=true&lang=en&hasQualification=true&qualifications=MBChB"
        },
        {
            "label": "66-65-form-triage",
            "url": "http://localhost:3000/V11/66-or-65?role-type=ap"            
        },
        {
            "label": "66-65-form-triage-bilingual-en",
            "url": "http://localhost:3000/V11/66-or-65?role-type=ap&bilingual=true"            
        },
        {
            "label": "nhs-number",
            "url": "http://localhost:3000/V11/nhs-number?role-type=ap"            
        },
        {
            "label": "nhs-number-bilingual",
            "url": "http://localhost:3000/V11/nhs-number?role-type=ap&bilingual=true"            
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