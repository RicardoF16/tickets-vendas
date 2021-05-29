const EventoService = require('../../services/evento.service');

class EventoController {

  getAll(req, res) {
    EventoService.getAll()
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

    EventoService.getById(id)
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

  getDias(req, res) {
    const idEvento = req.params.idEvento;

    EventoService.getDias(idEvento)
      .then(dias => {
        if (dias) {
          res.send(dias)
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

  getLotes(req, res) {
    const idEvento = req.params.idEvento;
    const idDiaEvento = req.params.idDiaEvento;

    EventoService.getLotes(idEvento, idDiaEvento)
      .then(lotes => {
        if (lotes) {
          res.send(lotes)
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

  getDestaques(req, res) {
    EventoService.getDestaques()
      .then(destaques => {
        if (destaques) {
          res.send(destaques)
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
}

module.exports = new EventoController();