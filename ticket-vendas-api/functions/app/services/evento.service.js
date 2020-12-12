const { reject } = require('lodash');
let BaseService = require('./base.service');

class EventoService extends BaseService {
  getAll() {
    return new Promise((resolve, reject) => {
      this.database.ref('eventos')
        .once('value', snap => {
          const value = snap.val();
          let list = [];
          if (value) {
            list = Object.values(value);
            list.forEach(item => {
              delete item.diasEvento;
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
          var filter = result.diasEvento[idDiaEvento].lotes.filter(lote => {
            //TODO: Filtrar data
            if (lote.qtdeTicketsVendidos < lote.qtdeTotalTickets && lote.ativo) {
              return lote;
            }
          });
          resolve(filter);
        } else {
          resolve()
        }
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