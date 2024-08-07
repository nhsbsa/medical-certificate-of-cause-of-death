//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// ************************************************************
// USER DATA FROM HEROKU AND VERSIONING
// ************************************************************

router.use((req, res, next) => {

    // Redirect check
    let redirect = false;

    let versions = {
        'V10': ['/V10/','/V10-1/','/v10/','/v10-1/'],
        'V11': ['/V11/','/V11bi/','/v11/','/v11bi/']
    };

    function _findVersionAndPath(url, versions) {

        let obj;

        for (let version in versions) {
            for (let path of versions[version]) {
                if (url.includes(path)) {
                    obj = { settings: version, path: path, version: path.split('/').join('') };
                }
            }
        }
        return obj;
    }

    let version = _findVersionAndPath(req.originalUrl, versions);

    if( version ){

        // Locals
        res.locals.version = version.version;
        res.locals.settings = version.settings;
        
        res.locals.currentUrl = req.originalUrl;
        

        // Check the query strings
        let queryStringVars = req.originalUrl.split('?');
        if (queryStringVars.length > 1) {

            const urlParams = new URLSearchParams(queryStringVars[queryStringVars.length - 1]);

            // Check for lang
            const lang = urlParams.get('lang');
            req.session.data.lang = (lang) ? lang : req.session.data.lang;

            // Check for userProfile
            let userProfile = parseInt(urlParams.get('userProfile'));
            userProfile = (!Number.isNaN(userProfile)) ? userProfile : 0;

            if( userProfile !== parseInt(req.session.data.currentUserProfile) ){

                redirect = true;

                const users = (process.env.USERS) ? JSON.parse(process.env.USERS) : [];

                if (users.length > userProfile) {

                    const user = users[userProfile];
                    req.session.data.user = user;

                    // If there's only one role type, set it automatically...
                    if ( user && user.role && user.role.length === 1 ) {
                        req.session.data['role-type'] = user.role[0];
                    }

                }

            }

            req.session.data.currentUserProfile = userProfile;

        }

    }

    // Handle redirection
    if( redirect ){
        // If we need an instant update of the data eg. on user profiles...redirect back to itself...
        res.redirect(res.locals.currentUrl);
    } else {
        next();
    }



});



// =======================================
// Version Routes Files Below
// =======================================

// Current version - matching close to what is currently live
router.use('/current', require('./views/current/_routes'));

// Iterations
router.use('/v6', require('./views/v6/_routes'));
router.use('/v7', require('./views/v7/_routes'));
router.use('/v8', require('./views/v8/_routes'));
router.use('/v9', require('./views/v9/_routes'));
router.use('/V10', require('./views/V10/_routes'));
router.use('/V10-1', require('./views/V10-1/_routes'));
router.use('/V11', require('./views/V11/_routes'));
router.use('/V11bi', require('./views/V11bi/_routes'));


module.exports = router;