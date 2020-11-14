const express = require('express');
const controller = require('./compra.controller');
const Router = express.Router();
const permissoes = require('./../../middleware/permissoes');

module.exports = Router

.get('/', permissoes(80), controller.getAll) //Retorna todas compras
.get('/:id', permissoes(0), controller.getById) //Retorna compra pelo id
.get('/me', permissoes(0), controller.getMe) //Retorna compras do usuário logado
//.get('/datas', permissoes(80), controller.getByDate) //Retorna compras com filtro de data

.post('/', controller.post) // Cria o registro da compra