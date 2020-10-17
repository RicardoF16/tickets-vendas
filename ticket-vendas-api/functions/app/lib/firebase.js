const admin = require('firebase-admin'),
      serviceAccount = require('../config/serviceAccountKey.json'),
      functions = require('firebase-functions'),
      firebase = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://tickets-vendas-65715.firebaseio.com/"
      });

const tools = {
  admin: admin,
  functions: functions,
  firebase: firebase
};

module.exports = tools;
