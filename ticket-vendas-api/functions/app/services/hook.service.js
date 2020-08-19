const HookModel = require('../models/hook.model');

class HookService {

  getAll(query) {
    return HookModel.find(query);
  }

  getById(id) {
    return HookModel.findById(id);
  }

  create(exemplo) {
    return HookModel.create(exemplo);
  }

  update(id, exemplo) {
    return HookModel.update(id, exemplo);
  }

  delete(id) {
    return HookModel.delete(id);
  }


}

module.exports = new HookService();