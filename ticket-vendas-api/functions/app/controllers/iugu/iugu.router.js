const express = require('express');
const controller = require('./iugu.controller');
const Router = express.Router();
const validateIdToken = require('../../middleware/authentication');

module.exports = Router
  .post('/hook', controller.hook)
  .get('/assinaturas', validateIdToken, controller.listarAssinturas)
  // .get('/boleto/:id', validateIdToken, controller.buscarBoleto)
  .post('/assinaturas', validateIdToken, controller.criarAssinatura)
  .delete('/assinaturas/:id', validateIdToken, controller.suspenderAssinatura)
  .get('/cartoes', validateIdToken, controller.listarCartoes)
  .post('/cartoes', validateIdToken, controller.adicionarCartao)
  .delete('/cartoes/:id', validateIdToken, controller.removerCartao);