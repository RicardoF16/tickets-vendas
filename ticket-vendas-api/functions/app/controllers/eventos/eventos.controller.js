const EventoService = require('../../services/evento.service');

class EventoController {

  getAll(req, res) {
    const query = { orderBy: true };
    EventoService.getByQuery(query)
      .then(eventos => {
        if (eventos) {
          res.send(eventos)
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
    query.id = req.param.id;

    EventoService.getById(id)
      .then(evento => {
        if (evento) {
          res.send(eventos)
        }
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }
}

module.exports = new EventoController();