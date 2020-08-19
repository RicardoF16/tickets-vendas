const SuporteService = require('../../services/suporte.service');


class SuporteController {
  
  post(req, res) {    
    const suporte = req.body;

    SuporteService.create(suporte)
      .then(suporteCriado => {
        res.send(suporteCriado);
      }).catch(err => {
        res.status(400).send(err);
      });
  }

}

module.exports = new SuporteController();