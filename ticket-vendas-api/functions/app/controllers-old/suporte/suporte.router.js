const express = require('express');
const controller = require('./suporte.controller');
const Router = express.Router();

module.exports = Router
  .post('/', controller.post)
