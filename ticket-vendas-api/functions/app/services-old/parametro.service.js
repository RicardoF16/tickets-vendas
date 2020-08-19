const ParametroModel = require('../models/parametro.model');

class ParametroService {

  getAll(query) {
    return ParametroModel.find(query);
  }

  getById(id) {
    return ParametroModel.findById(id);
  }

  create(parametro) {
    console.log('Antes de executar o post');  
    return ParametroModel.create(parametro);
  }

  update(id, parametro) {
    return ParametroModel.update(id, parametro);
  }

  delete(id) {
    return ParametroModel.delete(id);
  }


}

module.exports = new ParametroService();