const SolicitacaoModel = require('../models/evento.model');

class EventoService {

  getByQuery(query) {
    return SolicitacaoModel.find(query);
  }

  getById(id) {
    return SolicitacaoModel.findById(id);
  }
}

module.exports = new EventoService();