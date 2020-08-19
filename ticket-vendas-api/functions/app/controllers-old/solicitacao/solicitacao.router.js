const express = require('express');
const controller = require('./solicitacao.controller');
const Router = express.Router();

module.exports = Router
  .get('/', controller.getAll)
  .get('/mine/:id', controller.getByPCPId)
  .get('/:id', controller.getById)
  .post('/', controller.post)
  .put('/:id', controller.put)
  .delete('/:id', controller.delete)
  
  .get('/:id/informacoes/:idInfo', controller.getByIdInfo)
  .post('/:id/informacoes', controller.postInfo)
  .delete('/:id/informacoes/:idInfo', controller.deleteInfo) 
  .put('/:id/informacoes/:idInfo', controller.putInfo);
