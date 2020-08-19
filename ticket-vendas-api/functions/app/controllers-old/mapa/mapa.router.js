const express = require('express');
const controller = require('./mapa.controller');
const Router = express.Router();

module.exports = Router
  //.get('/', controller.getAll);
  .get('/:latUser/:longUser/:raio', controller.getSolitacoesMapa)
