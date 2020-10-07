const SolicitacaoModel = require('../models/evento.model');
//const informacaoModel = require('../models/informacao.model');
//const usuariosModel = require('../models/usuario.model');
//const ParametrosService = require('./parametro.service');
//let distanceCalculator = require('../helpers/distance-calculator.helper');
//let sendPush = require('../helpers/push-notification.helper');


class SolicitacaoService {

  getAll(query) {
    return SolicitacaoModel.find(query);
  }

  getById(id) {
    return SolicitacaoModel.findById(id);
  }

  getByEventoId(id) {
    console.log(id);
    return SolicitacaoModel.findOne({
      where: `(idEvento,=,${id})`
    });
  }

  getAllUsers() {
    return usuariosModel.rebuild(`/usuarios`).find({});
  }

  getUserById(id) {
    return usuariosModel.findOne(id);
    // return usuariosModel.findById(id);
  }

  create(evneto) {
    //solicitacao.idPCP = solicitacao.pcp.id;
    //evneto.idEvento = evneto.id
    return SolicitacaoModel.create(evneto);
  }

  update(id, solicitacao) {
    return SolicitacaoModel.update(id, solicitacao);
  }

  delete(id) {
    return SolicitacaoModel.delete(id);
  }


  deleteInfo(id) {
    return informacaoModel.delete(id, idInfo);
  }

  atualizarItemSolicitacao(item) {
    console.log("item dentro de atualizarItemSolicitacao >>", item);
    this.getAll({ where: `(idPCP,=,${item.id})`, perPage: 9999 })
      .then(solicitacao => {

        solicitacao.list.forEach(solicitacao => {
          solicitacao.pcp = { ...item }
          this.update(solicitacao.id, solicitacao);
        });

      });
  }

  enviarNotificacaoParaQuemEstiverPerto(lat, long, idDono, tipoItem, titulo, msg) {
    this.getAllUsers().then(usuarios => {
      if (usuarios) {
        usuarios.list.forEach(user => {
          if (!(user.id == idDono)) {
            let raioMax = 0;
            ParametrosService.getAll('').then(paramentros => {
              if (paramentros) {
                paramentros.list.forEach(param => {
                  if (param.item == tipoItem) {
                    raioMax = param.raioMax;
                  }
                });

                // console.log('raioMax >>>>>>> ', raioMax);
                
                const result = distanceCalculator(user.lat, user.long, lat, long, raioMax);

                // console.log('result >>>>>>> ', result);

                if (result) {
                  if (user.idPushNotification) {
                    // console.log('user ===>>>>>>', user);
                    
                    user.idPushNotification.forEach(token => {
                      sendPush(token, titulo, msg);
                    });
                  }
                } else {
                  console.log('Fora do raio para notificação!')
                }
              }
            });
          }
        });
      }
    }).catch(err => {
      console.error("Erro na busca dos dados de usuários para envio de notificação!");
    });
  }

  enviarNotificacaoParaDono(idDono, titulo, msg) {
    usuariosModel.findById(idDono)
      .then(usuario => {
        console.log('usuario', usuario);
        if (usuario && usuario.idPushNotification) {
          usuario.idPushNotification.forEach(token => {
            console.log('token >>>>>>>> ', token);
            sendPush(token, titulo, msg);
          });
        }
      }).catch(err => {
        console.error(JSON.stringify(err));
        console.error("Erro na busca dos dados de usuários para envio de notificação!");
      });
  }

}

module.exports = new SolicitacaoService();