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
const usuarioRouter = require('./controllers/usuarios/usuario.router');
const exemploRouter = require('./controllers/exemplo/exemplo.router');
const eventosRouter = require('./controllers/eventos/eventos.router');
const informacaoRouter = require('./controllers/informacao/informacao.router');
const parametroRouter = require('./controllers/parametros/parametro.router');
const mapaRouter = require('./controllers/mapa/mapa.router');
const iuguRouter = require('./controllers/iugu/iugu.router');
const sessaoRouter = require('./controllers/sessoes/sessao.router');
const reportRouter = require('./controllers/reports/report.router');
const docRouter = require('./controllers/docs/doc.router');
const suporteRouter = require('./controllers/suporte/suporte.router');
const giftCardRouter = require('./controllers/giftcard/giftcard.router');

app.use(cors);
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(pino);

app.use('/', express.static(path.join(__dirname, 'public'))); 

app.use('/usuarios', usuarioRouter);
app.use('/eventos', eventosRouter);
app.use('/informacoes', informacaoRouter);
app.use('/parametros', parametroRouter);
app.use('/exemplos', exemploRouter);
app.use('/mapa', mapaRouter);
app.use('/suporte', suporteRouter);

app.use('/relatorios', reportRouter);
app.use('/pagamentos', iuguRouter)
app.use('/sessoes', sessaoRouter);
app.use('/giftcard', validateIdToken, giftCardRouter);

app.get('/version', (req, res) => {
  const prodVersion = ['1.10.0'];
  // console.log('req.query ', req);
  // const id = req.query.id;
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
