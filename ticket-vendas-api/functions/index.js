// 'use strict';

const serve = require('./app/serve'),
      functions = require('firebase-functions');

exports.api = functions.https.onRequest(serve);
