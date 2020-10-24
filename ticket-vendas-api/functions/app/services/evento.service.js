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
            reject()
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

  update(id, exemplo) {
    return new Promise((resolve, reject) => {
      this.database.ref('eventos/' + id).set(exemplo);
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