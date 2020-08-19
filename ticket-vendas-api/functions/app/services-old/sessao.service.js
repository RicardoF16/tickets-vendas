const SessaoModel = require('../models/sessao.model');
const admin = require('../lib/firebase').admin;

class SessaoService {

  getAll(query) {
    return SessaoModel.find(query);
  }

  getById(id) {
    return SessaoModel.findById(id);
  }

  create(id) {
    const sessao = {};
    return new Promise((resolve, reject) => {
      admin.auth().createCustomToken(id)
        .then(token => {
          sessao.token = token;
          SessaoModel.create(sessao)
            .then((session => {
              resolve(session);
            }))
        });
    })

  }

  update(id, sessao) {
    return SessaoModel.update(id, sessao);
  }

  delete(id) {
    return SessaoModel.delete(id);
  }


}

module.exports = new SessaoService();