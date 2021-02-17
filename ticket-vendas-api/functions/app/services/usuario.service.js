const { user } = require('firebase-functions/lib/providers/auth');
let BaseService = require('./base.service');

class UsuarioService extends BaseService {

  getAll() {
    return new Promise((resolve, reject) => {
      this.database.ref('usuarios')
        .once('value', usuarioSnap => {
          const usuarios = usuarioSnap.val();
          let lista = [];

          if (usuarios) {
            Object.keys(usuarios).forEach(key => {
              lista.push(usuarios[key]);
            });

            lista.sort(function (a, b) {
              return (a.nome).localeCompare(b.nome);
            })
          }

          resolve(lista);
        }).catch(err => reject(err));
    });
  }

  getByColumn(columnName, value) {
    return new Promise((resolve, reject) => {
      this.database.ref('/usuarios/')
        .orderByChild(columnName)
        .equalTo(value)
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

  getByCpf(cpf) {
    let cpfClean = cpf.replace('.', '').replace('.', '').replace('-', '');
    return this.getByColumn('cpf', cpfClean);
  }

  getByEmail(email) {
    return this.getByColumn('email', email);
  }

  async verify(params) {
    let result = '';

    if (params && params.email && params.cpf) {
      const userEmail = await this.getByEmail(params.email);
      if (userEmail && userEmail.uid) {
        result = 'Email já cadastrado.';
      }

      const userCpf = await this.getByCpf(params.cpf);
      if (userCpf && userCpf.uid) {
        if (result != '') {
          result = "Email e CPF já cadastrados.";
        } else {
          result = 'CPF já cadastrado.';
        }
      }
    } else {
      result = "Favor informar o CPF e o Email a ser verificado.";
    }

    return result;
  }

  create(usuario) {
    return new Promise((resolve, reject) => {
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