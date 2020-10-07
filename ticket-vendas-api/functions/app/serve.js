'use strict';

const express = require('express'),
      cookieParser = require('cookie-parser')(),
      bodyParser = require('body-parser'),
      cors = require('cors')({ origin: true }),
      app = express(),
      path = require('path'),
      validateIdToken = require('./middleware/authentication'),
      errorHandler = require('./middleware/error-handler'),
      pino = require('express-pino-logger')();

// importando todas as rotas
//const exemploRouter = require('./controllers/exemplo/exemplo.router');
const usuarioRouter = require('./controllers/usuarios/usuario.router');
const eventosRouter = require('./controllers/eventos/eventos.router');
const docRouter = require('./controllers/docs/doc.router');

app.use(cors);
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public'))); 

app.use('/usuarios', auth ,usuarioRouter);
app.use('/eventos', eventosRouter);


app.get('/version', (req, res) => {
  const prodVersion = ['0.0.1'];
  const version = (req.url).replace('/version?=id', '');
  const index = prodVersion.indexOf(version);

  res.send({
    prod: index >= 0
  });

});

// importante: documentacao swagger
app.use('/spec', docRouter);

app.use(errorHandler);

module.exports = app;
