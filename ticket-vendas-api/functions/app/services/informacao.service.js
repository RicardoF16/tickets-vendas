const InformacaoModel = require('../models/informacao.model');
let distanceCalculator = require('../helpers/distance-calculator.helper');
let sendPush = require('../helpers/push-notification.helper');

class SolicitacaoService {

  getAll(query) {
    return InformacaoModel.find(query);
  }

  getInformacaoAll(id) {
    //return InformacaoModel.find(`/eventos/${id}/informacoes`).findById();
    return InformacaoModel.find(query);
    /*return InformacaoModel.rebuild(`/eventos/${id}/informacoes`);
    return InformacaoModel.rebuild(`/eventos/${id}/informacoes`).findById(idInfo)*/
  }


  getById(id, idInfo) {
    //return InformacaoModel.findById(id);
    return InformacaoModel.rebuild(`/eventos/${id}/informacoes`).findById(idInfo);
  }

  create(id, informacao) {
    // console.log('Chamada do rebild no service.')
    return InformacaoModel.rebuild(`/eventos/${id}/informacoes`).create(informacao);
  }

  update(id,idInfo, informacao) {
    //return InformacaoModel.update(id, informacao);
    return InformacaoModel.rebuild(`/eventos/${id}/informacoes`).update(idInfo, informacao);
  }

  delete(id, idInfo) {
    return InformacaoModel.rebuild(`/eventos/${id}/informacoes/`).delete(idInfo);
  }
}

module.exports = new SolicitacaoService();