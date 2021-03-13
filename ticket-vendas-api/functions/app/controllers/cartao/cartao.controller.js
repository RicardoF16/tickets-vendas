const CartaoService = require('../../services/cartao.service');

class CartaoController {

    getAll(req, res) {
        CartaoService.getAll(req.usuario.uid)
            .then(cartoes => {
                if (cartoes) {
                    res.send(cartoes)
                } else {
                    res.status(204);
                }
            }).catch(err => {
                res.sendStatus(500);
            });
    }

    getById(req, res) {
        const { id } = req.params;
        CartaoService.getByUid(req.usuario.uid, id)
            .then(cartao => {
                if (cartao) {
                    res.send(cartao);
                } else {
                    res.status(204);
                }
            }).catch(err => {
                res.sendStatus(500);
            });
    }

    put(req, res) {
        const { id } = req.params;
        const cartao = req.body;
        delete cartao.cart_number;
        delete cartao.cvv;

        CartaoService.update(req.usuario.uid, id, cartao)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {
                console.log(err);
                res.status(501).send(err);
            });
    }

    post(req, res) {
        const cartao = req.body;
        CartaoService.create(req.usuario.uid, cartao)
            .then(result => {
                res.status(201).send(result);
            }).catch(err => {
                if (err.hasError) {
                    res.status(400).send(err);
                } else {
                    res.sendStatus(500);
                }
            });
    }

    delete(req, res) {
        const { id } = req.params;
        CartaoService.delete(req.usuario.uid, id)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {
                if (err.hasError) {
                    res.status(400).send(err);
                } else {
                    res.sendStatus(500);
                }
            });
    }
}
module.exports = new CartaoController();