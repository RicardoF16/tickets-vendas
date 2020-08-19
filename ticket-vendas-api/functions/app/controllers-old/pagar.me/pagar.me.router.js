const express = require('express');
const controller = require('./pagar.me.controller');
const Router = express.Router();

module.exports = Router.get('/', controller.getAll)
  .get('/', controller.getAllTransactions)
  .post('/receiveStatus', controller.receiveStatus)
  .post('/doTransaction', controller.doTransaction);
