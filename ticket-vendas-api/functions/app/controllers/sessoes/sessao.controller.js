const SessaoService = require('../../services/sessao.service');


class SessaoController {
  getById(req, res){
    const { id } = req.params;

    SessaoService.getById(id)
      .then(sessao => {
      if(sessao && sessao.isValid) {
        res.send(sessao);
        SessaoService.delete(id);
      } else {
        res.sendStatus(404);
      }
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  post(req, res) {
    const { id } = req.usuario;
    SessaoService.create(id)
      .then(sessaoCriada => {
        res.send({ id: sessaoCriada.id });
      }).catch(err => {
        res.status(500).send(err);
      });
  }
}

module.exports = new SessaoController();