'use strict';

var config = require('./config.webgme'),
    validateConfig = require('webgme/config/validator');

//adding extra paths to be able to import
config.requirejsPaths.plotlyjs = './node_modules/plotly.js/dist/plotly';

// Add/overwrite any additional settings here
// config.server.port = 8080;
// config.mongo.uri = 'mongodb://127.0.0.1:27017/webgme_my_app';

validateConfig(config);
module.exports = config;


