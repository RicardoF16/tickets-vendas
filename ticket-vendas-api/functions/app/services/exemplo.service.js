let BaseService = require('./base.service');

class ExemploService extends BaseService {
  getAll() {
    return new Promise( (resolve, reject) => {
      this.database.ref('/exemplos')
      .once('value',exemploSnap =>{
        const exemplo = exemploSnap.val();
        let list = [];

        if(exemplo) {
          list = Object.values(exemplo);
        }

        resolve(list);
      }).catch(() => reject());
    });
  }

  getById(id) {
    return new Promise( (resolve, reject) => {
      this.database.ref('/exemplos/' + id)
        .once('value',exemploSnap =>{
          const exemplo = exemploSnap.val();
          if(exemplo) {
              resolve(exemplo);
          }
          resolve()
        }).catch(() => reject());
    });
  }

  create(exemplo) {
    return new Promise( (resolve, reject) => {
      let myRef = this.database.ref().push();
      let key = myRef.key;
      exemplo.id = key;

      this.database.ref('/exemplos/' + key).set(exemplo);

      resolve(exemplo);
    });
  }

  update(id, exemplo) {
    return new Promise( (resolve, reject) => {
      this.database.ref('/exemplos/' + id).set(exemplo);
      resolve();
    });
  }

  delete(id) {
    return new Promise( (resolve, reject) => {
      this.database.ref('/exemplos/' + id).remove();
      resolve();
    });
  }


}

module.exports = new ExemploService();