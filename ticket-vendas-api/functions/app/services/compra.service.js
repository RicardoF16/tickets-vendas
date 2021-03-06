let BaseService = require('./base.service');
let ticketService = require('./ticket.service');
let eventoService = require('./evento.service');

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
            this.database.ref('compras')
                .orderByChild('idUsuario')
                .equalTo(idUsuario)
                .once('value', snap => {
                    const value = snap.val();
                    if (value) {
                        resolve(Object.values(value));
                    } else {
                        resolve(null);
                    }
                }).catch(() => reject());
        });
    }

    create(req, obj) {
        return new Promise((resolve, reject) => {
            let myRef = this.database.ref().push();
            let key = myRef.key;

            const dateNow = new Date().toISOString();

            //Cria objeto que será armazenado na collection 'compras'
            let newObj = {
                id: key,
                dataCompra: dateNow,
                idEvento: obj.idEvento,
                idUsuario: req.usuario.uid,
                payment: {
                    // Mudar esse type caso tiver outro tipo de pagamento
                    paymentType: 1, //Cartão Credito
                    cart_number: obj.cardSelected.cart_number
                },
                //maiorIdade: obj.maiorIdade, //Bool usuário maior de idade
                //acceptBuyTherm: obj.acceptBuyTherm, //Termo de usu de compra aceito pelo usuário
                valorTotal: 0,
                tickets: []
            };

            //Cria ingressos selecionados pelo usuário na collection de 'tickets' e os vincula a compra.
            for (let i = 0; i < obj.ingressos.length; i++) {
                const t = obj.ingressos[i];

                if (t && t.qtdeSelecionada > 0) {

                    let index = 0;

                    while (index < t.qtdeSelecionada) {
                        index++;
                        ticketService.create(req.usuario.uid, obj.idEvento, key, t).then(resultT => {
                            if (resultT) {
                                newObj.valorTotal = parseFloat(newObj.valorTotal) + parseFloat(resultT.valor);
                                newObj.tickets.push(resultT.id);

                                if (i == obj.ingressos.length - 1 && index == t.qtdeSelecionada)
                                    finish();
                            } else {
                                reject("Não foi possível armazenar o ticket no banco.", newObj);
                            }
                        }).catch(errT => {
                            console.error(errT);
                            reject("Ocorreu uma falha ao armazenar o ticket no banco.", newObj);
                        });
                    }
                } else {
                    reject("Dados informados inválidos.", newObj);
                }
            }

            const context = this;
            function finish() {
                context.database.ref('compras/' + key).set(newObj).then(result => {
                    //Atualiza a quantitade de ingressos disponíveis no evento.
                    eventoService.updateQtdeIngressos(obj);
                    resolve(newObj);
                }).catch(err => {
                    reject("Falha ao gravar os registros.", newObj);
                });
            }
        });
    }

    update(id, exemplo) {
        return new Promise((resolve, reject) => {
            this.database.ref('compras/' + id).update(exemplo);
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