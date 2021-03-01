let BaseService = require('./base.service');

class UsuarioService extends BaseService {

  getAll() {
    return new Promise((resolve, reject) => {
      this.database.ref('usuarios')
        .orderByChild('nome')
        .once('value', usuarioSnap => {
          const usuarios = usuarioSnap.val();
          let lista = [];

          if (usuarios) {
            Object.keys(usuarios).forEach(key => {
              lista.push(usuarios[key]);
            });
          }

          resolve(lista);
        }).catch(err => reject(err));
    });
  }

  getByUid(uid) {
    return new Promise((resolve, reject) => {
      this.database.ref('/usuarios/' + uid)
        .once('value', usuarioSnap => {
          const usuario = usuarioSnap.val();
          if (usuario) {
            resolve(Object.values(usuario)[0]);
          } else {
            resolve(null);
          }
        }).catch(err => {
          reject(err);
        });
    });
  }

  verify(params) {
    return new Promise((resolve, reject) => {
      if (params && params.email && params.cpf) {
        const cpfClean = params.cpf.replace('.', '').replace('.', '').replace('-', '');
        this.getAll().then(users => {
          if (users && users.length > 0) {
            users.forEach(u => {
              if (u.cpf === cpfClean) {
                resolve('CPF já cadastrado.');
              } else if (u.email === params.email) {
                resolve('Email já cadastrado.');
              }
            });
          }
          resolve('');
        });
      } else resolve('Favor informar o CPF e o Email a ser verificado.');
    });
  }

  ajustFields(usuario) {
    if (usuario && usuario.cpf) {
      try {
        do {
          usuario.cpf = usuario.cpf.replace('.', '');
        } while (usuario.cpf.indexOf('.') != -1);
        usuario.cpf = usuario.cpf.replace('-', '');
      } catch (ex) {
        return null;
      }
    } else {
      return null;
    }

    return usuario;
  }

  create(usuario) {
    return new Promise((resolve, reject) => {
      usuario = this.ajustFields(usuario);
      if (usuario == null) {
        reject('Campos inválidos.');
      }

      this.authorization.createUser({
        email: usuario.email,
        password: usuario.senha,
        displayName: usuario.nome,
        emailVerified: false
      }).then(usuarioCriado => {
        usuario.uid = usuarioCriado.uid;
        usuario.key = usuarioCriado.uid;
        usuario.role = 1;
        delete usuario.senha;
        this.database.ref('/usuarios/' + usuarioCriado.uid)
          .set(usuario)
          .then(data => {
            resolve(usuario);
          }).catch(err => {
            reject(err);
          });
      }).catch(error => {
        reject(error);
      });
    });
  }

  createSocialLogin(usuario) {
    return new Promise((resolve, reject) => {
      this.create(usuario)
        .then(usuarioCriadoFb => {
          resolve(usuarioCriadoFb);
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
      usuario = this.ajustFields(usuario);
      if (usuario == null) {
        reject('Campos inválidos.');
      }

      if (usuario.senha) {
        let requisicao = { password: usuario.senha };
        this.authorization.updateUser(uid, requisicao)
          .then(() => {
            console.info(`Usuário: ${uid}, acaba de trocar de senha`);
          });

        delete usuario.senha;
      }

      this.database.ref('/usuarios/' + uid).update(usuario).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  delete(uid) {
    return new Promise((resolve, reject) => {
      this.authorization.deleteUser(uid)
        .then(() => {
          this.database.ref('/usuarios/' + uid).remove();
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    })
  }

}

module.exports = new UsuarioService();