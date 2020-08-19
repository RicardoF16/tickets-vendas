const express = require('express');
const controller = require('./report.controller');
const Router = express.Router();

module.exports = Router
  .get('/general', controller.general)