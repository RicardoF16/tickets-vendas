const express = require('express');
const controller = require('./eventos.controller');
const Router = express.Router();

module.exports = Router
  .get('/', controller.getAll)
  .get('/mine/:id', controller.getByEventoId)
  .get('/:id', controller.getById)
  .post('/', controller.post)
  .put('/:id', controller.put)
  .delete('/:id', controller.delete)
  
  .get('/:id/informacoes', controller.getInfoAll)
  .get('/:id/informacoes/:idInfo', controller.getByIdInfo)
  .post('/:id/informacoes', controller.postInfo)
  .delete('/:id/informacoes/:idInfo', controller.deleteInfo) 
  .put('/:id/informacoes/:idInfo', controller.putInfo)

  .get('/:id/informacoes/:idInfo/setor/:idSetor', controller.getByIdSetor)
  .post('/:id/informacoes/:idInfo/setor', controller.postSetor)
  .delete('/:id/informacoes/:idInfo/setor/:idSetor', controller.deleteSetor) 
  .put('/:id/informacoes/:idInfo/setor/:idSetor', controller.putSetor);

