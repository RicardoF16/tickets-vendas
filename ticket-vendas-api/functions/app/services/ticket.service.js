let BaseService = require('./base.service');

class TicketService extends BaseService {
  //   getAll() {
  //     return new Promise((resolve, reject) => {
  //       this.database.ref('tickets')
  //         .once('value', snap => {
  //           const value = snap.val();
  //           let list = [];
  //           if (value) {
  //             list = Object.values(value);
  //           }
  //           resolve(list);
  //         }).catch(() => reject());
  //     });
  //   }

  //   getById(id) {
  //     return new Promise((resolve, reject) => {
  //       this.database.ref('tickets/' + id)
  //         .once('value', snap => {
  //           const value = snap.val();
  //           if (value) {
  //             resolve(value);
  //           } else {
  //             resolve()
  //           }
  //         }).catch(() => reject());
  //     });
  //   }

  getByIdEvento(idEvento) {
    return new Promise((resolve, reject) => {
      this.database.ref('tickets').orderByChild('idEvento').equalTo(idEvento).once('value', snap => {
        const value = snap.val();
        if (value)
          resolve(value);
        else
          resolve();
      }).catch((err) => reject(err));
    });
  }

  create(idUser, idEvento, obj) {
    return new Promise((resolve, reject) => {
      let myRef = this.database.ref().push();
      let key = myRef.key;
      let newObj = {};
      newObj.id = key;
      newObj.idUsuario = idUser;
      newObj.idEvento = idEvento;
      newObj.dataCriacao = new Date().toISOString();
      // newObj.dataValidacao = null;
      newObj.setor = obj.setor;
      newObj.tipo = 1;
      if (obj.cortesia == true) {
        newObj.tipo = 2;
      }

      newObj.validado = false;
      newObj.valor = obj.valor;

      this.database.ref('tickets/' + key).set(newObj).then(result => {
        resolve(newObj);
      }).catch(err => {
        reject(null);
      });
    });
  }

  update(id, exemplo) {
    return new Promise((resolve, reject) => {
      this.database.ref('tickets/' + id).set(exemplo);
      resolve();
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.database.ref('tickets/' + id).remove();
      resolve();
    });
  }


}

module.exports = new TicketService();