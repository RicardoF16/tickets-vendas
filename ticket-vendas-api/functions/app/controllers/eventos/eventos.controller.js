const EventoService = require('../../services/evento.service');

class EventoController {

  getAll(req, res) {
    EventoService.getAll()
      .then(eventos => {
        if (eventos) {
          res.send(eventos)
        } else {
          res.sendStatus(500);
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
    
    EventoService.getById(id)
      .then(evento => {
        if (evento) {
          res.send(evento)
        } else {
          res.sendStatus(500);
        }
      }).catch(err => {
        if (err && err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }
}

module.exports = new EventoController();