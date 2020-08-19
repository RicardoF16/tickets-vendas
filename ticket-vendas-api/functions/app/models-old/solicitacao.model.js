const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  
  idDono: {
    type: String,
    required: [true, 'REQUIRED_IDDONO']
  },
  donoNome: {
    type: String,
    required: [true, 'REQUIRED_IMAGE_URL']
  },
  descricao: {
    type: String,
    default: ''
  },
  idioma: {
    type: String,
    required: true,
    enum: ['pt-br', 'es-us', 'en-us'],
    default: 0
  },
  status: {
    type: String,
    required: true,
    enum: [0, 1],
    default: 0
  },
  informacoes: {
    type: String,
  },
  publicadoEm: {
    type: String,
    required: [true, 'REQUIRED_DATE']
  },
  aceitouTermos: {
    type: Boolean
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  },
  endereco: {
    type: String,
    required: [true, 'REQUIRED_IMAGE_URL']
  },
  pcp: {
    type: Object,
    required: [true, 'REQUIRED_PCP']
  },
  idPCP: {
    type: String,
    required: [true, 'REQUIRED_idPCP']
  }
};

const SolicitacaoModel = new firenode.schema(schema);

module.exports = Model.ref('/solicitacoes', SolicitacaoModel);
