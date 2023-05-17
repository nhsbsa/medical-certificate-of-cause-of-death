//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// =======================================
// Version Routes Files Below
// =======================================

router.use('/current', require('./views/current/_routes'));


module.exports = router;