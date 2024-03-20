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
router.use('/v11bi', require('./views/V11bi/_routes'));
router.use('/v11', require('./views/V11/_routes'));
router.use('/v10-1', require('./views/V10-1/_routes'));
router.use('/v10', require('./views/V10/_routes'));
router.use('/v9', require('./views/v9/_routes'));
router.use('/v8', require('./views/v8/_routes'));
router.use('/v7', require('./views/v7/_routes'));
router.use('/v6', require('./views/v6/_routes'));

// Tests
router.use('/tests', require('./views/tests/_routes'));



module.exports = router;