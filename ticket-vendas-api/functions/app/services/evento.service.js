const { reject } = require('lodash');
let BaseService = require('./base.service');

class EventoService extends BaseService {
  getAll(filtrarData = false) {
    return new Promise((resolve, reject) => {
      this.database.ref('eventos')
        .once('value', snap => {
          const value = snap.val();
          let list = [];
          if (value) {
            Object.values(value).forEach(item => {
              delete item.diasEvento;

              if (filtrarData) {
                const timeNow = new Date().getTime();
                const timeEnd = new Date(item.dataFim).getTime();

                //Valida se o evento ainda está disponível pra compra
                if (timeNow < timeEnd) {
                  list.push(item);
                }
              } else {
                list.push(item);
              }
            });
          }
          resolve(list);
        }).catch(() => reject());
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.database.ref('eventos/' + id)
        .once('value', snap => {
          const value = snap.val();
          if (value) {
            resolve(value);
          } else {
            resolve()
          }
        }).catch(() => reject());
    });
  }

  getDias(idEvento) {
    return new Promise((resolve, reject) => {
      this.getById(idEvento).then(result => {
        if (result && result.diasEvento) {
          resolve(result.diasEvento);
          //TODO: Filtrar dias
        } else {
          resolve()
        }
      }).catch(() => reject());
    });
  }

  getLotes(idEvento, idDiaEvento) {
    return new Promise((resolve, reject) => {
      this.getById(idEvento).then(result => {

        if (result && result.diasEvento[idDiaEvento]) {
          const timeNow = new Date().getTime();
          const timeEnd = new Date(result.diasEvento[idDiaEvento].dataFim).getTime();

          if (timeNow >= timeEnd) {
            resolve();
          }

          var filter = result.diasEvento[idDiaEvento].lotes.filter(lote => {
            if (lote.qtdeTicketsVendidos < lote.qtdeTotalTickets && lote.ativo) {
              return lote;
            }
          });

          var evento = {
            idEvento: result.id,
            titulo: result.titulo,
            tipo: result.tipo,
            nomeLocal: result.nomeLocal,
            local: result.local,
            diaEvento: result.diasEvento[idDiaEvento].dataInicio,
            horaAberturaDia: result.diasEvento[idDiaEvento].horaAbertura,
            horaShowDia: result.diasEvento[idDiaEvento].horaShow,
            lotes: filter
          };

          resolve(evento);
        } else {
          resolve()
        }
      }).catch(ex => {
        console.exception(ex);
        reject();
      });
    });
  }

  getDestaques() {
    return new Promise((resolve, reject) => {
      this.database.ref('destaques')
        .once('value', snap => {
          const value = snap.val();
          let list = [];
          if (value) {
            const dateNow = new Date();
            Object.values(value).forEach(destaque => {
              if (destaque && destaque.dataFimExibicao) {
                const dateFimExib = new Date(destaque.dataFimExibicao);
                if (dateNow <= dateFimExib)
                  list.push(destaque);
              }
            });
          }
          resolve(list);
        }).catch(() => reject());
    });
  }

  create(exemplo) {
    return new Promise((resolve, reject) => {
      let myRef = this.database.ref().push();
      let key = myRef.key;
      exemplo.id = key;

      this.database.ref('eventos/' + key).set(exemplo);

      resolve(exemplo);
    });
  }

  updateQtdeIngressos(carrinho) {
    this.getById(carrinho.idEvento).then(result => {

      carrinho.ingressos.forEach(item => {
        const lote = result.diasEvento[item.idDataEvento].lotes[item.id];
        if (lote) {
          lote.qtdeTicketsVendidos = parseInt(lote.qtdeTicketsVendidos) + parseInt(item.qtdeSelecionada);
        }
      });
      this.update(carrinho.idEvento, result);
      resolve();
    }).catch(err => {
      reject(err);
    });
  }

  update(id, exemplo) {
    return new Promise((resolve, reject) => {
      this.database.ref('eventos/' + id).update(exemplo);
      resolve();
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.database.ref('eventos/' + id).remove();
      resolve();
    });
  }


}

module.exports = new EventoService();