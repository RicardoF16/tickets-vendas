const firenode = require('../lib/firenode'),
      Model = firenode.model;

 const schema = {
  nome: {
    type: String,
    required: [true, 'REQUIRED_NOME']
  },
  idade: {
    type: Number,
    required: [true, 'REQUIRED_IDADE']
  },
  altura: {
    type: Number,
    required: [true, 'REQUIRED_ALTURA']
  },
  corCabelo: {
    type: String,
    required: [true, 'REQUIRED_COR_CABELO']
  },
  parentesco: {
    type: Number,
    required: [true, 'REQUIRED_PARENTESCO']
  },
  imagemURL: {
    type: String,
    required: [true, 'REQUIRED_IMAGE_URL']
  },
  observacoes: {
    type: String,
    default: ''
  }
};

const PessoaModel = new firenode.schema(schema);

module.exports = Model.ref('/pessoas', PessoaModel);
