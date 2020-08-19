const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  data: {
    type: Object,
    required: [true, 'O campo nome é obrigatório']
  },
  idTransaction: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
  },
};

const TransactionModel = new firenode.schema(schema);

module.exports = Model.ref('/transaction', TransactionModel);
