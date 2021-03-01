const express = require('express');
const controller = require('./usuario.controller');
const Router = express.Router();
const authentication = require('../../middleware/authentication');
const permissoes = require('../../middleware/permissoes');

module.exports = Router
  //authentication
  .get('/',   controller.getAll)
  .get('/me', authentication, controller.getMe)
  .put('/me', authentication, controller.putMe)
  .get('/:uid', authentication, controller.getById)

  .post('/',  controller.post)
  .post('/verify', controller.verify)
  .post('/admin',  controller.admin)
  .post('/social',  controller.postSocial)

  .put('/:uid', authentication, permissoes(99), controller.put)
  .delete('/:uid', authentication, permissoes(99),controller.delete)

  