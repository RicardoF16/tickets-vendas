const EventoService = require('../../services/evento.service');
const InformacaoService = require('../../services/informacao.service');
const setorService = require('../../services/setor.service');
/*const itemService = require('../../services/item.service');
const usuariosModel = require('../../models/usuario.model');*/

class EventoController {

  /*
  INICIO REQUISIÇÔES DE SOLICITAÇÕES
  */
  getAll(req, res) {
    const query = req.query;
    query.orderBy = true;
    
    EventoService.getAll(query)
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
    const { id } = req.params;

    EventoService.getById(id)
      .then(evento => {
        if (evento) {
          res.send(evento);
        } else {
          res.sendStatus(404);
        }
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }

  getByEventoId(req, res) {
    const { id } = req.params;

    EventoService.getByEventoId(id)
      .then(evento => {
        if (evento) {
          res.send(evento);
        } else {
          res.sendStatus(404);
        }
      }).catch(err => {
        if (err) {
          res.status(400).send(String(err));
        } else {
          res.sendStatus(500);
        }
      });
  }

  post(req, res) {

    const evento = req.body;
    const tipoItem = 0;

    EventoService.create(evento)
      .then(eventoCriado => {
        res.send(eventoCriado);
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }

  put(req, res) {
    const { id } = req.params;
    const evento = req.body;

    EventoService.getById(id).then(solicitacaoAtual => {
      if (solicitacaoAtual) {

        /*statusAtual = solicitacaoAtual.status;
        idDono = solicitacaoAtual.idDono;
        lat = solicitacaoAtual.lat;
        long = solicitacaoAtual.long;*/

        EventoService.update(id, evento)
          .then(eventoEditado => {
            // solicitacaoEditada === undefined

            /*if (!(solicitacao.status == statusAtual)) {
              EventoService.enviarNotificacaoParaQuemEstiverPerto(
                lat,
                long,
                idDono,
                tipoItem,
                "Verifique, um novo status na solicitação no Pet Car People",
                "Verifique, um novo status na solicitação no Pet Car People" + solicitacao.descricao);
            }

            let tipo = '';
            if (solicitacaoAtual.pcp['placa']) {
              tipo = 'veiculos';
            } else if (solicitacaoAtual.pcp['parentesco']) {
              tipo = 'pessoas';
            } else if (solicitacaoAtual.pcp['raca']) {
              tipo = 'pets';
            }

            const obj = {
              [tipo]: {
                [solicitacaoAtual.pcp.id]: {
                  ...solicitacaoAtual.pcp,
                  status: solicitacao.status
                }
              }
            };*/

            /* usuariosModel.update(idDono, obj)
              .then(succ => {
                // console.log('succ >>>>>>>> ', succ);
              }, err => {
                // console.log('err >>>>>>>> ', err);
              });*/


            res.send(solicitacaoEditada);
          }).catch(err => {
            res.status(500).send(err);
          });
      } else {
        res.sendStatus(404);
      }
    }).catch(err => {
      if (err.hasError) {
        res.status(400).send(err);
      } else {
        res.sendStatus(500);
      }
    });
  }

  delete(req, res) {
    const { id } = req.params;
    EventoService.delete(id)
      .then(() => {
        res.sendStatus(200);
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }


  /*
  FIM REQUISIÇÔES DE SOLICITAÇÕES
  */


  /*
  iNICIO REQUISIÇÔES DE INFORMAÇÕES DA SOLICITAÇÃO
  */

  postInfo(req, res) {
    const informacao = req.body;
    const { id } = req.params;
    
    InformacaoService.create(id, informacao)
      .then(informacaoCriada => {
        console.log('informacaoCriada >>>>>> ', JSON.stringify(informacaoCriada));

        /*SolicitacaoService.enviarNotificacaoParaDono(
          informacaoCriada.idDono,
          "Nova informação da solicitação..",
          "Abra seu aplicativo agora e veja as novidades sobre seu item perdido!");*/

        res.send(informacaoCriada);
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }

  deleteInfo(req, res) {
    const { id, idInfo } = req.params;
    InformacaoService.delete(id, idInfo)
      .then(() => {
        res.sendStatus(200);
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }

  getInfoAll(req, res) {
    const query = req.query;
    const { id } = req.params;
    InformacaoService.getInformacaoAll(query,id)
      .then(informacao => {
        if (informacao) {
          res.send(informacao);
        } else {
          res.sendStatus(404);
        }
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }


  getByIdInfo(req, res) {
    const { id, idInfo } = req.params;
    InformacaoService.getById(id, idInfo)
      .then(solicitacao => {
        if (solicitacao) {
          res.send(solicitacao);
        } else {
          res.sendStatus(404);
        }
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }

  putInfo(req, res) {
    const { id, idInfo } = req.params;
    const solicitacao = req.body;
    InformacaoService.update(id, idInfo, solicitacao)
      .then(solicitacaoEditada => {
        res.send(solicitacaoEditada);
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }
  /*
    FIM REQUISIÇÔES DE INFORMAÇÕES DA SOLICITAÇÃO
  */


  /*
  iNICIO REQUISIÇÔES DO SETOR
  */

 postSetor(req, res) {
  console.log('inicio setor >>>>>> ' );
  const setor = req.body;
  const { id, idInfo } = req.params;
  
  console.log('id >>>>>> ', id);
  console.log('idInfo >>>>>> ', idInfo);
  console.log('setor >>>>>> ', setor);
  setorService.create(id, idInfo, setor)
    .then(setor => {
      console.log('setor >>>>>> ', JSON.stringify(setor));

      /*SolicitacaoService.enviarNotificacaoParaDono(
        informacaoCriada.idDono,
        "Nova informação da solicitação..",
        "Abra seu aplicativo agora e veja as novidades sobre seu item perdido!");*/

      res.send(setor);
    }).catch(err => {
      if (err.hasError) {
        res.status(400).send(err);
      } else {
        res.sendStatus(500);
      }
    });
}

deleteSetor(req, res) {
  const { id, idInfo, idSetor } = req.params;
  setorService.delete(id, idInfo, idSetor)
    .then(() => {
      res.sendStatus(200);
    }).catch(err => {
      if (err.hasError) {
        res.status(400).send(err);
      } else {
        res.sendStatus(500);
      }
    });
}

getByIdSetor(req, res) {
  const { id, idInfo, idSetor } = req.params;
  setorService.getById(id, idInfo, idSetor)
    .then(setor => {
      if (setor) {
        res.send(setor);
      } else {
        res.sendStatus(404);
      }
    }).catch(err => {
      if (err.hasError) {
        res.status(400).send(err);
      } else {
        res.sendStatus(500);
      }
    });
}

putSetor(req, res) {
  const { id, idInfo, idSetor } = req.params;
  const setor = req.body;
  setorService.update(id, idInfo, idSetor, setor)
    .then(setorEditado => {
      res.send(setorEditado);
    }).catch(err => {
      if (err.hasError) {
        res.status(400).send(err);
      } else {
        res.sendStatus(500);
      }
    });
}
/*
  FIM REQUISIÇÔES DE SETOR
*/





  /*
    INICIO REQUISIÇÔES DO ITEM RELACIONADO A SOLICITAÇÂO 
  */

  /*getByUidItem(req, res) {

    const { id, idItem } = req.params;
    const tipoItem = req.body.tipoItem;
    itemService.getByIdItemSolicitacao(id, idItem, tipoItem)
      .then(item => {
        if (item) {
          res.send(item);
        } else {
          res.sendStatus(404);
        }
      }).catch(err => {
        res.status(500).send(err);
      });
  }


  postItem(req, res) {
    const item = req.body;
    const { id } = req.params;
    const tipoItem = req.body.tipoItem;
    itemService.createItemSolicitacao(id, item, tipoItem)
      .then(itemCriado => {
        res.send(itemCriado);
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  putItem(req, res) {
    const { id, idItem } = req.params;
    const item = req.body;
    const tipoItem = req.body.tipoItem;
    itemService.updateItemSolicitacao(id, idItem, item, tipoItem)
      .then(itemEditado => {
        res.send(itemEditado);
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  deleteItem(req, res) {
    const { id, idItem } = req.params;
    const tipoItem = req.body.tipoItem;
    itemService.deleteItemSolicitacao(id, idItem, tipoItem)
      .then(() => {
        res.sendStatus(200);
      }).catch(err => {
        res.status(500).send(err);
      });
  }*/

  /*
    FIM REQUISIÇÔES DO ITEM RELACIONADO A SOLICITAÇÂO 
  */




}

module.exports = new EventoController();