const meusTicketsModel = require('../models/meusTikets.model');
const usuarioModel = require('../models/usuario.model');
const UsuarioService = require('../services/usuario.service');


class ItemService {
  /*
  INICIO DAS CHAMADAS DOS ITENS RELACIONADO AO USUARIO
  */

  getAll(query) {
    return meusTicketsModel.find(query);
  }

  getAllUsers() {
    return usuariosModel.rebuild(`/usuarios`).find({});
  }


  getByIdUser(id) {
    return meusTicketsModel.rebuild(`/usuarios/${id}/meusTickets`).find({})
  }

  getById(query) {
    return meusTicketsModel.find(query);
  }


  create(usuario, item, tipoItem, id) {
    /*if (tipoItem == '0') {
      
      if (usuario.veiculosDisponiveis > 0) {

        if (usuario.giftcards) {
          const index = usuario.giftcards.findIndex(giftcard => {
            return !giftcard.usado;
          });
      
          if (index >= 0) {
            usuario.giftcards[index].usado = true;
            usuario.veiculosDisponiveis--;
            let today = new Date();
            const duracaoMeses = usuario.giftcards[index].duracaoMeses;
            today.setMonth(today.getMonth() + duracaoMeses);
            item.validUntil = today.toJSON();
      
            usuarioModel.update(usuario.id, usuario)
              .then(user => {
              }, e => {
                console.log('e ', e);
              });
            return veiculoModel.rebuild(`/usuarios/${usuario.id}/veiculos`).create(item);
          } else {
            return Promise.reject();
          }
        } else if (usuario.assinaturas) {
          const index = usuario.assinaturas.findIndex(assinatura => {
            return !assinatura.isUsed;
          });
          if (index >= 0) {
            usuario.assinaturas[index].isUsed = true;
            usuario.veiculosDisponiveis--;
            usuarioModel.update(usuario.id, usuario);

            item.idAssinatura = usuario.assinaturas[index].idAssinatura;
            return veiculoModel.rebuild(`/usuarios/${usuario.id}/veiculos`).create(item);
          } else {
            return Promise.reject();
          }
        }

      } else {
        return Promise.reject();
      }

    } else if (tipoItem == '1') {
      return pessoaModel.rebuild(`/usuarios/${usuario.id}/pessoas`).create(item);
    } else {
      return petModel.rebuild(`/usuarios/${usuario.id}/pets`).create(item);
    }*/

    //return meusTicketsModel.rebuild(`/usuarios/${id}/itens`).create(item);
    return meusTicketsModel.rebuild(`/usuarios/${id}/meusTickets`).create(item);

  }

  update(id, idItem, item) {
    return meusTicketsModel.rebuild(`/usuarios/${id}/meusTickets`).update(idItem, item);
    /*if (tipoItem == '0')
      return veiculoModel.rebuild(`/usuarios/${id}/veiculos`).update(idItem, item);
    else if (tipoItem == '1')
      return pessoaModel.rebuild(`/usuarios/${id}/pessoas`).update(idItem, item);
    else
      return petModel.rebuild(`/usuarios/${id/pets`).update(idItem, item);*/

  }



  delete(id, idItem ) {
    console.log('id >> ', id);
    console.log('idItem >> ', idItem);
    return meusTicketsModel.rebuild(`/usuarios/${id}/meusTickets/`).delete(idItem);
    /*if (tipoItem == '0') {
      return new Promise((resolve, reject) => {
        const path = `/usuarios/${id}/veiculos/`;
        veiculoModel.rebuild(path).findById(idItem)
          .then(item => {
            if (item.idAssinatura) {
              UsuarioService.suspenderAssinatura(id, item.idAssinatura)
                .then(() => {
                  veiculoModel.rebuild(path).delete(idItem)
                    .then(() => {
                      resolve();
                    });
                });
            } else {
              veiculoModel.rebuild(path).delete(idItem)
                .then(() => {
                  resolve();
                });
            }
          });
      });
    }
    else if (tipoItem == '1')
      return pessoaModel.rebuild(`/usuarios/${id}/pessoas/`).delete(idItem);
    else
      return petModel.rebuild(`/usuarios/${id}/pets/`).delete(idItem); */
  }

  /*
  FIM DAS CHAMADAS DOS ITENS RELACIONADO AO USUARIO
  */



  /*
  INICIO DAS CHAMADAS DO ITEM RELACIONADO A SOLICITAÇÃO
  */

  /*getByIdItemSolicitacao(id, idItem) {
    if (tipoItem == '0')
      return veiculoModel.rebuild(`/solicitacoes/${id}/veiculos`).findById(idItem);
    else if (tipoItem == '1')
      return pessoaModel.rebuild(`/solicitacoes/${id}/pessoas`).findById(idItem);
    else
      return petModel.rebuild(`/solicitacoes/${id}/pets`).findById(idItem);
  }

  createItemSolicitacao(id, item, tipoItem) {
    if (tipoItem == '0')
      return veiculoModel.rebuild(`/solicitacoes/${id}/veiculos`).create(item);
    else if (tipoItem == '1')
      return pessoaModel.rebuild(`/solicitacoes/${id}/pessoas`).create(item);
    else
      return petModel.rebuild(`/solicitacoes/${id}/pets`).create(item);
  }

  updateItemSolicitacao(id, idItem, item, tipoItem) {
    if (tipoItem == '0')
      return veiculoModel.rebuild(`/solicitacoes/${id}/veiculos`).update(idItem, item);
    else if (tipoItem == '1')
      return pessoaModel.rebuild(`/solicitacoes/${id}/pessoas`).update(idItem, item);
    else
      return petModel.rebuild(`/solicitacoes/${id}/pets`).update(idItem, item);
  }

  deleteItemSolicitacao(id, idItem, tipoItem) {
    if (tipoItem == '0')
      return veiculoModel.rebuild(`/solicitacoes/${id}/veiculos/`).delete(idItem);
    else if (tipoItem == '1')
      return pessoaModel.rebuild(`/solicitacoes/${id}/pessoas/`).delete(idItem);
    else
      return petModel.rebuild(`/solicitacoes/${id}/pets/`).delete(idItem);
  }*/

  /*
  INICIO DAS CHAMADAS DO ITEM RELACIONADO A SOLICITAÇÃO
  */

}

module.exports = new ItemService();