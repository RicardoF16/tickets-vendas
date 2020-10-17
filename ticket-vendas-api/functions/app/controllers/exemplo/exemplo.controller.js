const ExemploService = require('../../services/exemplo.service');
const util = require('../../services/util.service');
const moment = require('moment');

class ExemploController {

  getAll(req, res) {
    let bla;

    bla = `Dia: ${util.getDayOfWeek('2018-01-31')}`;
    res.send(bla);


    // ExemploService.getAll()
    //   .then(exemplos => {
    //     if(exemplos) {
    //       res.send(exemplos)
    //     }
    //   }).catch(err => {
    //       res.sendStatus(500);
    //   });
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