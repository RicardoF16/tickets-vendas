const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  
  id: {
    type: String,
    required: [true, '']
  },  
  idEvento: {
    type: String,
    required: [true, '']
  },
  idUsuario: {
    type: String,
    required: [true, '']
  },
  dataCompra: {
    type: String,
    required: [true, '']
  },
  valorTotal: {
    type: Number,
    required: [true, '']
  },
  tickets: {
    type: Array
  }
};

const CompraModel = new firenode.schema(schema);

module.exports = Model.ref('/compra', CompraModel);