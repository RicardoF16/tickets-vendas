const InformacaoService = require('../../services/informacao.service');
const SolicitacaoService = require('../../services/evento.service');


class InformacaoController {

  getAll(req, res) {
    const query = req.query;

    InformacaoService.getAll(query)
      .then(informacoes => {
        if(informacoes) {
          res.send(informacoes)
        }
      }).catch(err => {
          res.status(500).send(err);
      });
  }
  
  getById(req, res){
    const { id } = req.params;

    InformacaoService.getById(id)
      .then(informacao => {
      if(informacao) {
        res.send(informacao);
      } else {
        res.sendStatus(404);
      }
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  
  post(req, res) {    

    
    const informacao = req.body;
    InformacaoService.create(informacao).then(informacaoCriada => {
        // SolicitacaoService.enviarNotificacao(informacaoCriada.lat, 
        //                                      informacaoCriada.long, 
        //                                      informacaoCriada.id, 
        //                                      "Nova informação da solicitaça..",
        //                                      "Verifique a nova informação da solicitação: " + 
        //                                      informacaoCriada.desricao);
        res.send(informacaoCriada);                                             
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  put(req, res) {
    const { id } = req.params;
    const informacao = req.body;
    console.log('inico do método put de informação...')
    InformacaoService.update(id, informacao)
      .then(informacaoEditada => {
        res.send(informacaoEditada);
      }).catch(err => {
        res.status(500).send(err);
      });
  }
  
  delete(req, res) {
    const { id } = req.params;

    InformacaoService.delete(id)
      .then(() => {
        res.sendStatus(200);
      }).catch(err => {
        res.status(500).send(err);
      });
    }

}

module.exports = new InformacaoController();