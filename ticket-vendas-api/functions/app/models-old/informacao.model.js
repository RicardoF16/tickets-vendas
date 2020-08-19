const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  idUsuario: {
    type: String,
    required: [true, 'REQUIRED_IDUSUARIO']
  },
  idDono: {
    type: String,
    required: [true, 'REQUIRED_ID_DONO']
  },
  comentario: {
    type: String
  },
  publicadoEm: {
    type: String,
    required: [true, 'REQUIRED_PUBLICADO_EM']
  },
  endereco: {
    type: String,
    required: [true, 'REQUIRED_ENDERECO']
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  }
  
};

const InformacaoModel = new firenode.schema(schema);

module.exports = Model.ref('/informacoes', InformacaoModel);
