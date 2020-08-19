const express = require('express');
const controller = require('./usuario.controller');
const Router = express.Router();
const authentication = require('../../middleware/authentication');
const permissoes = require('../../middleware/permissoes');

module.exports = Router
  //authentication
  .get('/',authentication,  controller.getAll)
  .get('/me', authentication, controller.getMe)
  .put('/me', authentication, controller.putMe)
  .get('/:uid', authentication, controller.getById)
  .post('/', controller.post)
  .post('/admin', controller.admin)
  .post('/social', controller.postSocial)
  .put('/:uid', authentication, permissoes(99), controller.put)
  .delete('/:uid', authentication, controller.delete)

  .post('/itens', authentication, controller.postItem)
  .get('/itens/:idItem', authentication, controller.getByUidItem)
  .delete('/itens/:idItem', authentication, controller.deleteItem)
  .put('/itens/:idItem', authentication, controller.putItem);

  