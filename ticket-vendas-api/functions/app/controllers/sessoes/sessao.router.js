const express = require('express');
const controller = require('./sessao.controller');
const auth = require('../../middleware/authentication');
const Router = express.Router();

module.exports = Router
  .get('/:id', controller.getById)
  .post('/', auth, controller.post);