'use strict';

const serve = require('./app/serve'),
      cron = require('node-cron'),
      //UsuarioService = require('./app/services/usuario.service'),
      //ItemService = require('./app/services/item.service'),
      functions = require('firebase-functions');
functions.http
exports.api = functions.https.onRequest(serve);

cron.schedule('00 00 12 * *', async () => {
  console.log('running a task every day at 12pm');
  
  // const page = await UsuarioService.getAll({ perPage: 99999 });
  // for (let i = 0; i < page.list.length; i++) {
  //   const usuario = page.list[i];
    
  //   if(usuario.veiculos) {
  //     const keys = Object.keys(usuario.veiculos);
      
  //     keys.forEach(async key => {
  //       const veiculo = usuario.veiculos[key];
  //       if(veiculo.validUntil) {
  //         const start = new Date(veiculo.validUntil);
  //         const end = new Date();

  //         if(end.getTime() > start.getTime()) {
  //           await ItemService.delete(usuario.id, veiculo.id, 0);
  //         }
  //       }
  //     });
  //   }
  // }
});