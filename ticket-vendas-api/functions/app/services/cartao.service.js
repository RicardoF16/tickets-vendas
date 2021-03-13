let BaseService = require('./base.service');

class CartaoService extends BaseService {
    getAll(uid) {
        return new Promise((resolve, reject) => {
            this.database.ref(`usuarios/${uid}/cartoes`)
                .once('value', snap => {
                    const value = snap.val();
                    let list = [];
                    if (value) {
                        list = Object.values(value);
                    }
                    resolve(list);
                }).catch(() => reject());
        });
    }

    getById(uid, idCart) {
        return new Promise((resolve, reject) => {
            this.database.ref(`usuarios/${uid}/cartoes/${idCart}`)
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

    create(uid, cartao) {
        return new Promise((resolve, reject) => {
            const myRef = this.database.ref().push();
            const key = myRef.key;
            cartao.id = key;
            this.database.ref(`usuarios/${uid}/cartoes/${key}`).set(cartao);
            resolve(cartao);
        });
    }

    update(uid, id, cartao) {
        return new Promise((resolve, reject) => {
            this.database.ref(`usuarios/${uid}/cartoes/${id}`).update(cartao);
            resolve(cartao);
        });
    }

    delete(uid, id) {
        return new Promise((resolve, reject) => {
            this.database.ref(`usuarios/${uid}/cartoes/${id}`).remove();
            resolve(true);
        });
    }


}

module.exports = new CartaoService();