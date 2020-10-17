const ExemploService = require('../../services/exemplo.service');

class ExemploController {

  getAll(req, res) {
    res.send('Teste Exemplo')
  }

  getById(req, res) {
    const { id } = req.params;

    ExemploService.getById(id)
      .then(exemplo => {
        if (exemplo) {
          res.send(exemplo);
        } else {
          res.sendStatus(404);
        }
      }).catch(err => {
        res.sendStatus(500);
      });
  }


  put(req, res) {
    const { id } = req.params;
    const exemplo = req.body;

    ExemploService.update(id, exemplo)
      .then(() => {
        res.send(exemplo);
      }).catch(err => {
        res.sendStatus(500)
      });
  }

  post(req, res) {
    const exemplo = req.body;

    ExemploService.create(exemplo)
      .then(() => {
        res.sendStatus(201);
      }).catch(() => {
        res.sendStatus(500);
      });
  }

  delete(req, res) {
    const { id } = req.params;

    ExemploService.delete(id)
      .then(() => {
        res.sendStatus(200);
      }).catch(() => {
        res.sendStatus(500);
      })
  }

}

module.exports = new ExemploController();