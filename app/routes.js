//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// =======================================
// Version Routes Files Below
// =======================================

// Current version - matching close to what is currently live
router.use('/current', require('./views/current/_routes'));

// Iterations
router.use('/v6', require('./views/v6/_routes'));


module.exports = router;