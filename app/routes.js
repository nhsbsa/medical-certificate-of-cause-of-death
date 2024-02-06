//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
// const express = require('express');
// const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const nunjucks = require('nunjucks');
// const app = module.exports = express();

// =======================================
// Version Routes Files Below
// =======================================

// Current version - matching close to what is currently live
router.use('/current', require('./views/current/_routes'));

// Iterations
router.use('/v11', require('./views/V11/_routes'));
router.use('/v10-1', require('./views/V10-1/_routes'));
router.use('/v10', require('./views/V10/_routes'));
router.use('/v9', require('./views/v9/_routes'));
router.use('/v8', require('./views/v8/_routes'));
router.use('/v7', require('./views/v7/_routes'));
router.use('/v6', require('./views/v6/_routes'));


i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'cy'],
  queryParameter: "lang",
  // sets a custom cookie name to parse locale settings from
  cookie: 'lang_cookie_name',

  // where to store json files - defaults to './locales'
  directory: __dirname + '/locales'
});

// set default express engine and extension
// app.engine('html', nunjucks.render);
// app.set('view engine', 'njk');

// // you will need to use cookieParser to expose cookies to req.cookies
// app.use(cookieParser());

// // i18n init parses req for language headers, cookies, etc.
// app.use(i18n.init);


// configure nunjucks environment
// const env = nunjucks.configure('views', {
//   express: app //integrate nunjucks into express
// });
// env.addGlobal("__", i18n.__);
// env.addFilter("t", i18n.__);


// // serving homepage
// app.get('/', function (req, res) {
//   const templateData = {
//     date: new Date()
//   };
//   res.render('home', {templateData});
// });


module.exports = router;