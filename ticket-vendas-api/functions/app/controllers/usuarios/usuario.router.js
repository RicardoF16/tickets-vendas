const express = require('express');
const controller = require('./usuario.controller');
const Router = express.Router();
const authentication = require('../../middleware/authentication');
const permissoes = require('../../middleware/permissoes');

module.exports = Router
  //authentication
  .get('/',   controller.getAll)
  .get('/me',  controller.getMe)
  .put('/me',  controller.putMe)
  .get('/:uid', controller.getById)
  .post('/',  controller.post)
  .post('/admin',  controller.admin)
  .post('/social',  controller.postSocial)
  .put('/:uid', permissoes(99), controller.put)
  .delete('/:uid', permissoes(99),controller.delete)

  