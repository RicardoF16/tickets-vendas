const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  
  item: {
    type: String,
    required: [true, 'REQUIRED_ITEM']
  },
  raioMax: {
    type: Number,
    required: [true, 'REQUIRED_UNIDADE']
  }
};

const ParametroModel = new firenode.schema(schema);

module.exports = Model.ref('/parametros', ParametroModel);
