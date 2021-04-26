const CompraService = require('../../services/compra.service');
const EventoService = require('../../services/evento.service');
const ticketService = require('../../services/ticket.service');

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

    async getById(req, res) {
        const id = req.params.id;

        let compra = await CompraService.getById(id);
        if (compra) {
            compra.evento = await EventoService.getById(compra.idEvento);
            compra.tickets = await ticketService.getByIdEvento(compra.idEvento);
            res.send(compra);
        } else {
            res.sendStatus(204);
        }
    }

    async getMe(req, res) {
        const compras = await CompraService.getMe(req.usuario.uid);
        if (compras) {
            const eventos = await EventoService.getAll();
            if (eventos) {
                for (let c of compras) {
                    const evento = eventos.find(e => e.id == c.idEvento);
                    if (evento) {
                        c.evento = evento;
                    }
                }
            }
            res.send(compras);
        } else {
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