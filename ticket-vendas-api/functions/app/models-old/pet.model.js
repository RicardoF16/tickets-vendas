const firenode = require('../lib/firenode'),
      Model = firenode.model;

 const schema = {
  nome: {
    type: String,
    required: [true, 'REQUIRED_NOME']
  },
  raca: {
    type: String,
    required: [true, 'REQUIRED_RAÇA']
  },
  cor: {
    type: String,
    required: [true, 'REQUIRED_COR']
  },
  porte: {
    type: String,
    required: [true, 'REQUIRED_PORTE']
  },
  idade: {
    type: Number,
    required: [true, 'REQUIRED_IDADE']
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

module.exports = Model.ref('/pets', PessoaModel);
