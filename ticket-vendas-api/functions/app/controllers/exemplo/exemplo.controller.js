const ExemploService = require('../../services/exemplo.service');


class ExemploController {

  getAll(req, res) {

    const query = req.query;
    console.log("query >> ", query)    

    ExemploService.getAll(query)
      .then(exemplos => {
        if(exemplos) {
          res.send(exemplos)
        }
      }).catch(err => {
          res.status(500).send(err);
      });
  }
  
  getById(req, res){
    const { id } = req.params;

    ExemploService.getById(id)
      .then(exemplo => {
      if(exemplo) {
        res.send(exemplo);
      } else {
        res.sendStatus(404);
      }
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  
  post(req, res) {    
    const exemplo = req.body;

    ExemploService.create(exemplo)
      .then(exemploCriado => {
        res.send(exemploCriado);
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  put(req, res) {
    const { id } = req.params;
    const exemplo = req.body;

    ExemploService.update(id, exemplo)
      .then(exemploEditado => {
        res.send(exemploEditado);
      }).catch(err => {
        res.status(500).send(err);
      });
  }
  
  delete(req, res) {
    const { id } = req.params;

    ExemploService.delete(id)
      .then(() => {
        res.sendStatus(200);
      }).catch(err => {
        res.status(500).send(err);
      });
    }

}

module.exports = new ExemploController();