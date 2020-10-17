'use strict';

const express = require('express'),
  cookieParser = require('cookie-parser')(),
  bodyParser = require('body-parser'),
  cors = require('cors')({ origin: true }),
  app = express(),
  path = require('path'),
  errorHandler = require('./middleware/error-handler'),
  // pino = require('express-pino-logger')();
// const auth = require('./middleware/authentication');

// importando todas as rotas
const exemploRouter = require('./controllers/exemplo/exemplo.router');
const docRouter = require('./controllers/docs/doc.router');

app.use(cors);
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(pino);

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/exemplos', exemploRouter);

// importante: documentacao swagger
app.use('/spec', docRouter);

app.use(errorHandler);

module.exports = app;
