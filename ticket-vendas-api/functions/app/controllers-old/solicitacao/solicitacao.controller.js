const SolicitacaoService = require('../../services/solicitacao.service');
const InformacaoService = require('../../services/informacao.service');
const itemService = require('../../services/item.service');
const usuariosModel = require('../../models/usuario.model');

class SolicitacaoController {

  /*
  INICIO REQUISIÇÔES DE SOLICITAÇÕES
  */
  getAll(req, res) {
    const query = req.query;
    query.orderBy = true;
    
    SolicitacaoService.getAll(query)
      .then(solicitacoes => {
        if (solicitacoes) {
          res.send(solicitacoes)
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

    SolicitacaoService.getById(id)
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

  getByPCPId(req, res) {
    const { id } = req.params;

    SolicitacaoService.getByPCPId(id)
      .then(solicitacao => {
        if (solicitacao) {
          res.send(solicitacao);
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

    const solicitacao = req.body;
    const tipoItem = 0;

    SolicitacaoService.create(solicitacao)
      .then(solicitacaoCriada => {
        SolicitacaoService.enviarNotificacaoParaQuemEstiverPerto(
          solicitacaoCriada.lat,
          solicitacaoCriada.long,
          solicitacaoCriada.idDono,
          tipoItem,
          "Nova solicitação.",
          "Verifique, existe uma nova solicitação no Pet Car People");
          // "Verifique, existe uma nova solicitação no Pet Car People: " + solicitacaoCriada.descricao);
        solicitacaoCriada.idPCP = solicitacaoCriada.pcp.id;
        let tipo = '';
        if (solicitacaoCriada.pcp['placa']) {
          tipo = 'veiculos';
        } else if (solicitacaoCriada.pcp['parentesco']) {
          tipo = 'pessoas';
        } else if (solicitacaoCriada.pcp['raca']) {
          tipo = 'pets';
        }

        const obj = {
          [tipo]: {
            [solicitacaoCriada.pcp.id]: {
              ...solicitacaoCriada.pcp,
              status: 1
            }
          }
        };

        // console.log('obj >>>>>>>> ', obj);
        // console.log('solicitacaoCriada.idDono >>>>>>>> ', solicitacaoCriada.idDono);

        usuariosModel.update(solicitacaoCriada.idDono, obj)
          .then(succ => {
            // console.log('succ >>>>>>>> ', succ);
          }, err => {
            // console.log('err >>>>>>>> ', err);
          });
        res.send(solicitacaoCriada);
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
    const solicitacao = req.body;
    const tipoItem = req.body.typeItem;
    let statusAtual = "";
    let idDono = "";
    let lat = "";
    let long = "";

    SolicitacaoService.getById(id).then(solicitacaoAtual => {
      if (solicitacaoAtual) {

        statusAtual = solicitacaoAtual.status;
        idDono = solicitacaoAtual.idDono;
        lat = solicitacaoAtual.lat;
        long = solicitacaoAtual.long;

        SolicitacaoService.update(id, solicitacao)
          .then(solicitacaoEditada => {
            // solicitacaoEditada === undefined

            // console.log('solicitacao >>>>>>> ', solicitacao);
            // console.log('solicitacaoAtual >>>>>>> ', solicitacaoAtual);
            // console.log('statusAtual >>>>>>> ', statusAtual);

            if (!(solicitacao.status == statusAtual)) {
              SolicitacaoService.enviarNotificacaoParaQuemEstiverPerto(
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
            };

            // console.log('obj >>>>>>>> ', obj);
            // console.log('solicitacaoCriada.idDono >>>>>>>> ', idDono);

            usuariosModel.update(idDono, obj)
              .then(succ => {
                // console.log('succ >>>>>>>> ', succ);
              }, err => {
                // console.log('err >>>>>>>> ', err);
              });


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

    SolicitacaoService.delete(id)
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
    // const tipoItem = req.body.tipoItem;

    InformacaoService.create(id, informacao)
      .then(informacaoCriada => {
        console.log('informacaoCriada >>>>>> ', JSON.stringify(informacaoCriada));

        SolicitacaoService.enviarNotificacaoParaDono(
          informacaoCriada.idDono,
          "Nova informação da solicitação..",
          "Abra seu aplicativo agora e veja as novidades sobre seu item perdido!");
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
    INICIO REQUISIÇÔES DO ITEM RELACIONADO A SOLICITAÇÂO 
  */

  getByUidItem(req, res) {

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
  }

  /*
    FIM REQUISIÇÔES DO ITEM RELACIONADO A SOLICITAÇÂO 
  */




}

module.exports = new SolicitacaoController();