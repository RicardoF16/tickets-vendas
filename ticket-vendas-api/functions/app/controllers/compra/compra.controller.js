const CompraService = require('../../services/compra.service');

class CompraController {

    getAll(req, res) {
        CompraService.getAll()
            .then(eventos => {
                if (eventos) {
                    res.send(eventos)
                } else {
                    res.sendStatus(204);
                }
            }).catch(err => {
                if (err.hasError) {
                    res.status(400).send(err);
                } else {
                    res.sendStatus(500);
                }
            });
    }

    getById(req, res) {
        const id = req.params.id;

        CompraService.getById(id)
            .then(evento => {
                if (evento) {
                    res.send(evento)
                } else {
                    res.sendStatus(204);
                }
            }).catch(err => {
                if (err && err.hasError) {
                    res.status(400).send(err);
                } else {
                    res.sendStatus(500);
                }
            });
    }

    getMe(req, res) {
        const idUsuario = req.params.idUsuario;

        CompraService.getMe(idUsuario)
            .then(result => {
                if (result) {
                    res.send(result)
                } else {
                    res.sendStatus(204);
                }
            }).catch(err => {
                if (err && err.hasError) {
                    res.status(400).send(err);
                } else {
                    res.sendStatus(500);
                }
            });
    }

    post(req, res) {
        const body = req.body;
        CompraService.create(req, body)
            .then(result => {
                res.send(result)
            }).catch(err => {
                console.log("bla 5", err);
                if (err && err.hasError) {
                    res.status(400).send(err);
                } else {
                    res.sendStatus(500).send(err);
                }
            });
    }
}

module.exports = new CompraController();