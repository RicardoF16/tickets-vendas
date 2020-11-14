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

  create(obj) {
    return new Promise((resolve, reject) => {
      let myRef = this.database.ref().push();
      let key = myRef.key;
      obj.id = key;

      this.database.ref('tickets/' + key).set(obj).then(result => {
        resolve(obj);
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