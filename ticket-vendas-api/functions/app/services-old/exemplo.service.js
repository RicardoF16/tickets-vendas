const ExemploModel = require('../models/exemplo.model');

class ExemploService {

  getAll(query) {
    return ExemploModel.find(query);
  }

  getById(id) {
    return ExemploModel.findById(id);
  }

  create(exemplo) {
    return ExemploModel.create(exemplo);
  }

  update(id, exemplo) {
    return ExemploModel.update(id, exemplo);
  }

  delete(id) {
    return ExemploModel.delete(id);
  }


}

module.exports = new ExemploService();