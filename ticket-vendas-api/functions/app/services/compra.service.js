let BaseService = require('./base.service');
let ticketService = require('./ticket.service');

class CompraService extends BaseService {
    getAll() {
        return new Promise((resolve, reject) => {
            this.database.ref('compras')
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

    getById(id) {
        return new Promise((resolve, reject) => {
            this.database.ref('compras/' + id)
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

    getMe(idUsuario) {
        return new Promise((resolve, reject) => {
            this.database.ref('compras/' + id)
                .orderByChild('idUsuario')
                .equalTo(idUsuario)
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

    async create(obj) {
        return new Promise((resolve, reject) => async function(){
            let myRef = this.database.ref().push();
            let key = myRef.key;

            const dateNow = new Date().toISOString();

            let newObj = {
                dataCompra: dateNow,
                idEvento: obj.idEvento,
                idUsuario: obj.idUsuario,
                valorTotal: 0,
                tickets: []
            };

            await obj.ticket.forEach(t => async function() {
                if (t) {
                    const ticket = await ticketService.create(t);
                    if (ticket) {
                        newObj.valorTotal = parseFloat(newObj.valorTotal) + parseFloat(t.valor);
                        newObj.tickets.push(ticketId)
                    } else {
                        reject("Não foi possível armazenar o ticket no banco.");
                    }
                } else {
                    reject("Dados informados inválidos.")
                }
            });

            this.database.ref('compras/' + key).set(newObj).then(result => {
                resolve(newObj);
            }).catch(err => {
                reject("Falha ao gravar os registros.");
            });
        });
    }

    update(id, exemplo) {
        return new Promise((resolve, reject) => {
            this.database.ref('compras/' + id).set(exemplo);
            resolve();
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.database.ref('compras/' + id).remove();
            resolve();
        });
    }


}

module.exports = new CompraService();