const CompraService = require('../../services/compra.service');
const EventoService = require('../../services/evento.service');

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

    async getMe(req, res) {
        console.log("bla1");
        const compras = await CompraService.getMe(req.usuario.uid);
        console.log("bla2");
        if (compras) {
            console.log("bla3");
            const eventos = await EventoService.getAll();
            if (eventos) {
                for (let c of compras) {
                    const evento = eventos.find(e => e.id == c.idEvento);
                    if (evento) {
                        c.evento = evento;
                    }
                }
            }

            console.log("bla4", compras);
            res.send(compras);
        } else {
            console.log("bla7");
            res.sendStatus(204);
        }
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