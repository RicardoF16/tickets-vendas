const express = require('express');
const controller = require('./cartao.controller');
const Router = express.Router();

module.exports = Router
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .put('/:id', controller.put)
    .post('/', controller.post)
    .delete('/:id', controller.delete)