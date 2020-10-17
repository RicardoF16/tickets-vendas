const express = require('express');
const controller = require('./exemplo.controller');
const authentication = require('../../middleware/authentication');
const Router = express.Router();

module.exports = Router
  .get('/', controller.getAll)
  .get('/:id', controller.getById)
  .post('/', controller.post)
  .put('/:id', controller.put)
  .delete('/:id', controller.delete); 