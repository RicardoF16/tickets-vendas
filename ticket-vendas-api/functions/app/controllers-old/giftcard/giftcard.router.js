const express = require('express');
const controller = require('./giftcard.controller');
const Router = express.Router();
const roleValidator = require('../../middleware/permissoes')

module.exports = Router
  .get('/', roleValidator(99), controller.getAll)
  .post('/', roleValidator(99), controller.post)
  .delete('/:id', roleValidator(99), controller.delete)
  .post('/:id/use', controller.use)