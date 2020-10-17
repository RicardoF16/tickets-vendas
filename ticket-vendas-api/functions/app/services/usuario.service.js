let BaseService = require('./base.service');

class UsuarioService extends BaseService {

  getAll(empresaKey) {
    return new Promise((resolve, reject) => {
      this.database.ref('usuarios')
        .orderByChild('empresaKey')
        .equalTo(empresaKey)
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

  getAllRegistraPonto(empresaKey) {
    return new Promise((resolve, reject) => {
      this.database.ref('usuarios')
        .orderByChild('empresaKey')
        .equalTo(empresaKey)
        .once('value', usuarioSnap => {
          const usuarios = usuarioSnap.val();
          let lista = [];

          if (usuarios) {
            Object.keys(usuarios).forEach(key => {
              if (usuarios[key].registraPonto)
                lista.push(usuarios[key]);
            });

            lista.sort(function (a, b) {
              return (a.nome).localeCompare(b.nome);
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
            resolve(usuario);
          } else {
            resolve(null);
          }
        }).catch(err => {
          reject(err);
        });
    });
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
        usuario.key = usuario.uid;
        delete usuario.senha;
        this.database.ref('/usuarios/' + usuarioCriado.uid)
          .set(usuario)
          .then(data => {
            const param = new Date();
            const paramDate = param.getFullYear() + '' + (param.getMonth() + 1) - 1;
            this.database.ref('/empresas/' + usuario.empresaKey + '/extratoMensal/' + usuario.key + '/' + paramDate).set({
              horasDebito: 0,
              horasExtras: 0,
              horasMesPassadoCalculado: true,
              horasTotalMesPassado: 0,
              uidAlteracao: ''
            })
            resolve(usuario);
          }).catch(err => {
            reject(err);
          });
      }).catch(error => {
        reject(error);
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