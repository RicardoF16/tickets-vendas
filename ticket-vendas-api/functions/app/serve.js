'use strict';

const express = require('express'),
  cookieParser = require('cookie-parser')(),
  bodyParser = require('body-parser'),
  cors = require('cors')({ origin: true }),
  app = express(),
  path = require('path'),
  errorHandler = require('./middleware/error-handler'),
  pino = require('express-pino-logger')();

const auth = require('./middleware/authentication');

app.use(cors);
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.use('/', express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/exemplos', require('./controllers/exemplo/exemplo.router'));

app.use('/usuario', require('./controllers/usuarios/usuario.router'));
app.use('/evento', require('./controllers/eventos/eventos.router'));
app.use('/compra', auth, require('./controllers/compra/compra.router'));
app.use('/cartao', auth, require('./controllers/cartao/cartao.router'));



app.get('/version', (req, res) => {
  // const prodVersion = ['0.0.1'];
  // const version = (req.url).replace('/version?=id', '');
  // const index = prodVersion.indexOf(version);

  res.send({
    // prod: index >= 0
    version: '0.0.1',
    date: new Date()
  });

});

// importante: documentacao swagger
app.use('/spec', require('./controllers/docs/doc.router'));

app.use(errorHandler);

module.exports = app;
