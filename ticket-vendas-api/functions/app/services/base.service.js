const { firebase, admin } = require('../lib/firebase');

class BaseService {
  constructor() {
    this.authorization = admin.auth();
    this.database = firebase.database();
  }
}

module.exports = BaseService;