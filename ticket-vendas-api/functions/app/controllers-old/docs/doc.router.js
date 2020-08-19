const express = require('express');
const controller = require('./doc.controller');
const Router = express.Router();

module.exports = Router
  .get('', controller.getAll);