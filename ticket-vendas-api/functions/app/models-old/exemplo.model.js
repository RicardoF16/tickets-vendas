const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  nome: {
    type: String,
    required: [true, 'O campo nome é obrigatório']
  },
  enum: {
    type: Number,
    required: false,
    enum: [0, 1]
  }, 
  total: {
    type: Number,
  },
  reponsavel: {
    type: String,
    required: [true, 'O campo responsavel é obrigatório'],
    default: 'Não atribuido'
  }
};

const ExemploModel = new firenode.schema(schema);

module.exports = Model.ref('/exemplos', ExemploModel);
