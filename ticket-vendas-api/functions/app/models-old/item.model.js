const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  tipo: {
    type: Number,
    required: true,
    enum: ['car', 'people', 'pet']
  },
  nome: {
    type: String
  },  
  donoNome: {
    type: String,
    required: [true, 'REQUIRED_DONO_NOME']
  },
  descricao: {
    type: String
  },
  idioma: {
    type: String,
    required: true,
    enum: ['pt-br', 'US'],
    default: 0
  },
  imagensURL: {
    type: [String],
    required: [true, 'REQUIRED_IMAGE_URL']
  },
  modelo: {
    type: [String]
  },
  placa: {
    type: [String]
  },
  cor: {
    type: [String],
    required: [true, 'REQUIRED_COR']
  },
  idade: {
    type: Number
  },
  raca: {
    type: [String]
  },
  parentesco: {
    type: [String]
  },
  altura: {
    type: [String]
  }
  
};

const InformacaoModel = new firenode.schema(schema);

module.exports = Model.ref('/informacoes', InformacaoModel);
