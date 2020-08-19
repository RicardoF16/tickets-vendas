const ParamentroService = require('../../services/parametro.service');


class ParamentroController {

  getAll(req, res) {
    const query = req.query;

    ParamentroService.getAll(query)
      .then(parametros => {
        if(parametros) {
          res.send(parametros)
        }
      }).catch(err => {
          res.status(500).send(err);
      });
  }
  
  getById(req, res){
    const { id } = req.params;

    ParamentroService.getById(id)
      .then(parametro => {
      if(parametro) {
        res.send(parametro);
      } else {
        res.sendStatus(404);
      }
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  
  post(req, res) {    

    
    const parametro = req.body;
    ParamentroService.create(parametro)
      .then(parametroCriado => {
        res.send(parametroCriado);
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  put(req, res) {
    const { id } = req.params;
    const parametro = req.body;

    ParamentroService.update(id, parametro)
      .then(parametroEditado => {
        res.send(parametroEditado);
      }).catch(err => {
        res.status(500).send(err);
      });
  }
  
  delete(req, res) {
    const { id } = req.params;

    ParamentroService.delete(id)
      .then(() => {
        res.sendStatus(200);
      }).catch(err => {
        res.status(500).send(err);
      });
    }

}

module.exports = new ParamentroController();