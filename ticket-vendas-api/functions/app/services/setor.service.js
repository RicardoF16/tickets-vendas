const setorModel = require('../models/setor.model');
/*let distanceCalculator = require('../helpers/distance-calculator.helper');
let sendPush = require('../helpers/push-notification.helper');*/

class SetorService {

  getAll(query) {
    return setorModel.find(query);
  }

  getById(id, idInfo, idSetor) {
    //return setorModel.rebuild(`/eventos/${id}/informacoes`).findById(idSetor);
    console.log(' getById(id, idInfo, idSetor)');
    return setorModel.rebuild(`/eventos/${id}/informacoes/${idInfo}/setor`).findById(idSetor);
  }

  create(id, idInfo, setor) {
    console.log('Create >> ')
    return setorModel.rebuild(`/eventos/${id}/informacoes/${idInfo}/setor`).create(setor);
    return InformacaoModel.rebuild(`/eventos/${id}/informacoes`).create(informacao);
    

  }

  update(id, idInfo, idSetor, setor) {
    //return setorModel.rebuild(`/eventos/${id}/informacoes`).update(idSetor, setor);
    return setorModel.rebuild(`/eventos/${id}/informacoes/${idInfo}/setor`).update(idSetor, setor);
  }

  delete(id, idInfo, idSetor) {
    //return setorModel.rebuild(`/eventos/${id}/informacoes/`).delete(idSetor);
    return setorModel.rebuild(`/eventos/${id}/informacoes/${idInfo}/setor`).delete(idSetor);
  }
}

module.exports = new SetorService();