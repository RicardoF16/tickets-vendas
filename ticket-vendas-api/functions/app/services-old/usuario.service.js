const { firebase } = require('../lib/firebase');
const UsuarioModel = require('../models/usuario.model');
const IuguService = require('../services/iugu.service');

class UsuarioService {
  getAll(query) {
    return UsuarioModel.find(query);
  }

  getOne(query) {
    return UsuarioModel.findOne(query);
  }

  getByUid(uid) {
    return UsuarioModel.findById(uid);
  }

  create(usuario) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUser({
          email: usuario.email,
          password: usuario.senha,
          displayName: usuario.nome,
          emailVerified: true
        })
        .then(usuarioCriado => {
          usuario.uid = usuarioCriado.uid;
          delete usuario.senha;
          usuario.premium = false;

          UsuarioModel.create(usuario)
            .then(usuarioCriadoFb => {

              IuguService.criarCliente({
                name: usuario.name,
                email: usuario.email
              }).then(iuguCliente => {
                usuario.idGateway = iuguCliente.id;
                console.log(iuguCliente);
                UsuarioModel.update(usuarioCriado.uid, usuario)
                  .then(usuario => {
                    console.log('conta iugu gerada com sucesso.');
                    resolve(usuarioCriadoFb);
                  });
              }).catch(error => {
                console.log(error);
              })

            })
            .catch(err => {
              firebase
                .auth()
                .deleteUser(usuarioCriado.uid)
                .then(() => {
                  reject(err);
                });
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  listarAssinaturaAtivas(idCliente) {
    return IuguService.listarAssintura(idCliente);
  }

  // buscarBoletoId(idBoleto) {
  //   console.log(idBoleto);

  //   return IuguService.boletoPorId(idBoleto);
  // }

  criarAssinatura(id, type, cliente) {
    return new Promise((resolve, reject) => {
      UsuarioModel.findById(id)
        .then(async usuario => {

          if (cliente) {
            await IuguService.updateCliente(usuario.idGateway, cliente);
          }

          if (type == 'boleto') {
            IuguService.criarAssinatura(usuario.idGateway, usuario.segundoPlano, 'bank_slip')
              .then(assinatura => {
                try {
                  const info = {
                    idAssinatura: assinatura.idTransaction,
                    criadaEm: assinatura.createdAt
                  };

                  if (usuario.assinaturas) {
                    usuario.assinaturas.push(info);
                  } else {
                    usuario.assinaturas = [info];
                  }

                  if (usuario.veiculosDisponiveis) {
                    usuario.veiculosDisponiveis++;
                  } else {
                    usuario.veiculosDisponiveis = 1;
                  }

                  this.update(id, usuario)
                    .then(() => { });
                  usuario.segundoPlano = true;
                  UsuarioModel.update(id, usuario);
                  resolve(assinatura);
                } catch (err) {
                  console.log(err);
                  reject(err);
                }
              }).catch(err => {
                reject(err);
              });
          } else {
            IuguService.listarCartoes(usuario.idGateway)
              .then(cartoes => {
                if (cartoes.length > 0) {
                  IuguService.criarAssinatura(usuario.idGateway, usuario.segundoPlano, 'credit_card')
                    .then(assinatura => {
                      console.log('assinatura ', assinatura);

                      try {
                        const info = {
                          idAssinatura: assinatura.idTransaction,
                          criadaEm: assinatura.createdAt
                        };

                        if (usuario.assinaturas) {
                          usuario.assinaturas.push(info);
                        } else {
                          usuario.assinaturas = [info];
                        }

                        if (usuario.veiculosDisponiveis) {
                          usuario.veiculosDisponiveis++;
                        } else {
                          usuario.veiculosDisponiveis = 1;
                        }

                        this.update(id, usuario)
                          .then(() => { });
                        usuario.segundoPlano = true;
                        UsuarioModel.update(id, usuario);
                        resolve(assinatura);
                      } catch (err) {
                        console.log(err);
                        reject(err);
                      }
                    }).catch(err => {
                      console.log('criarAssinatura ', err);
                      reject();
                    });
                } else {
                  console.log('cartoes ', cartoes);
                  reject();
                }
              });
          }

        });
    });

  }

  suspenderAssinatura(id, idAssinatura) {
    // return new Promise((resolve, reject) => { 
    //   IuguService.suspenderAssinatura(idAssinatura)
    //   resolve();
    // });

    return new Promise((resolve, reject) => {
      UsuarioModel.findById(id)
        .then(usuario => {

          const assinatura = usuario.assinaturas.find(assinatura => {
            return idAssinatura == assinatura.idAssinatura;
          });

          if (assinatura) {
            IuguService.suspenderAssinatura(idAssinatura)
              .then(() => {

                if (!assinatura.isUsed) {
                  usuario.veiculosDisponiveis--;
                } else {
                  Object.keys(usuario.veiculos)
                    .forEach(key => {
                      if (usuario.veiculos[key].idAssinatura == idAssinatura) {
                        delete usuario.veiculos[key];
                      }
                    });
                }

                usuario.assinaturas = usuario.assinaturas.filter(assinaturaAtual =>
                  assinaturaAtual.idAssinatura != idAssinatura);

                UsuarioModel.update(id, usuario)
                  .then(() => {
                    resolve();
                  }).catch(error => {
                    reject(error)
                  })
              }).catch(() => {
                reject();
              });
          } else {
            reject({
              msg: 'ERROR_NOT_AUTHORIZED'
            });
          }
        });
    });
  }

  listarCartoes(idCliente) {
    return IuguService.listarCartoes(idCliente);
  }

  addCartao(idCliente, cartao) {
    return IuguService.adicionarCartao(idCliente, cartao);
  }

  removeCartao(idCliente, idCartao) {
    return IuguService.removerCartao(idCliente, idCartao);
  }

  adminLogin(usuario) {
    return new Promise((resolve, reject) => {
      usuario.papel = 99;

      firebase
        .auth()
        .createUser({
          email: usuario.email,
          password: usuario.senha,
          displayName: usuario.nome,
          emailVerified: true
        })
        .then(usuarioCriado => {
          usuario.uid = usuarioCriado.uid;
          delete usuario.senha;

          UsuarioModel.create(usuario)
            .then(usuarioCriadoFb => {

              resolve(usuarioCriadoFb);
            })
            .catch(err => {
              firebase
                .auth()
                .deleteUser(usuarioCriado.uid)
                .then(() => {
                  reject(err);
                });
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  createSocialLogin(usuario) {
    return new Promise((resolve, reject) => {
      usuario.premium = false;
      usuario.papel = 1;

      UsuarioModel.create(usuario)
        .then(usuarioCriadoFb => {

          IuguService.criarCliente({
            name: usuario.name,
            email: usuario.email
          }).then(iuguCliente => {
            usuarioCriadoFb.idGateway = iuguCliente.id;
            console.log(iuguCliente);
            UsuarioModel.update(usuarioCriadoFb.id, usuarioCriadoFb)
              .then(usuario => {
                console.log('conta iugu gerada com sucesso.');
                resolve(usuarioCriadoFb);
              });
          });
        })
        .catch(err => {
          firebase
            .auth()
            .deleteUser(usuario.id)
            .then(() => {
              reject(err);
            });
        });
    });
  }

  update(uid, usuario) {
    return new Promise((resolve, reject) => {
      const senha = usuario.senha;
      UsuarioModel.update(uid, usuario)
        .then(usuarioAtualizado => {
          if (senha) {
            firebase.auth()
              .updateUser(uid, { password: senha })
              .then(() => {
                console.info(`Usuário: ${uid}, acaba de trocar de senha`);
              });
          }
          resolve(usuarioAtualizado);
        })
        .catch(err => {
          console.log('bla', err)
          reject(err);
        });
    });
  }

  delete(uid) {
    return new Promise((resolve, reject) => {
      firebase.auth().deleteUser(uid)
        .then(() => {
          UsuarioModel.delete(uid)
            .then(() => {
              resolve();
            }, () => {
              reject();
            }).catch(err => {
              reject(err);
            });
        }, err => {
          reject();
        }).catch((error) => {
          reject();
        });
    });
  }
}

module.exports = new UsuarioService();
