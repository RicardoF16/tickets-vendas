const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  descricao: {
    type: String,
    required: [true, 'REQUIRED_DESCRICAO']
  },
  valor: {
    type: String,
    required: [true, 'REQUIRED_VALOR']
  },
  lote: {
    type: String,
    required: [true, 'REQUIRED_LOTE']
  },
  setor: {
    type: String,
    required: [true, 'REQUIRED_SETOR']
  }
};

const setorModel = new firenode.schema(schema);

module.exports = Model.ref('/setor', setorModel);
