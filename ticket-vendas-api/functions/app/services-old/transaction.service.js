const TransactionModel = require('../models/exemplo.model');

class TransactionService {

  getAll(query) {
    return TransactionModel.find(query);
  }

  getById(id) {
    return TransactionModel.findById(id);
  }

  create(exemplo) {
    return TransactionModel.create(exemplo);
  }

  update(id, exemplo) {
    return TransactionModel.update(id, exemplo);
  }

  delete(id) {
    return TransactionModel.delete(id);
  }


}

module.exports = new TransactionService();