const express = require('express');
const controller = require('./eventos.controller');
const Router = express.Router();
const auth = require('./../../middleware/authentication');
const permissoes = require('./../../middleware/permissoes');

module.exports = Router

.get('/', controller.getAll) //Retorna todos os eventos com informações de exibição

.get('/destaques', controller.getDestaques) //Retorna eventos em destaque
.get('/:id', controller.getById) //Retorna evento pelo id
.get('/:idEvento/datas', auth, controller.getDias) //Retorna dias de evento
.get('/:idEvento/:idDiaEvento/lotes', auth, controller.getLotes) //Retorna lotes do evento

// .get('/data/:dtInicio/:dtFim', controller.getAll) //Retorna todos eventos por data

// .post('/', auth, permissoes(88), controller.post) //Cadastra novo evento
// .put('/:id', auth, permissoes(86), controller.post) //Edita evento
// .delete('/:id', auth, permissoes(95), controller.post) //Deleta evento


  // .get('/', controller.getAll)
  // .get('/mine/:id', controller.getByEventoId)
  // .get('/:id', controller.getById)
  // .post('/', controller.post)
  // .put('/:id', controller.put)
  // .delete('/:id', controller.delete)
  
  // .get('/:id/informacoes', controller.getInfoAll)
  // .get('/:id/informacoes/:idInfo', controller.getByIdInfo)
  // .post('/:id/informacoes', controller.postInfo)
  // .delete('/:id/informacoes/:idInfo', controller.deleteInfo) 
  // .put('/:id/informacoes/:idInfo', controller.putInfo)

  // .get('/:id/informacoes/:idInfo/setor/:idSetor', controller.getByIdSetor)
  // .post('/:id/informacoes/:idInfo/setor', controller.postSetor)
  // .delete('/:id/informacoes/:idInfo/setor/:idSetor', controller.deleteSetor) 
  // .put('/:id/informacoes/:idInfo/setor/:idSetor', controller.putSetor);

