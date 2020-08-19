const express = require('express');
const controller = require('./parametro.controller');
const Router = express.Router();
const authentication = require('../../middleware/authentication');

module.exports = Router
  .get('/', controller.getAll)
  .get('/:id', controller.getById)
  .post('/', controller.post)
  .put('/:id', authentication, controller.put)
  .delete('/:id', authentication, controller.delete); 