const firenode = require('../lib/firenode'),
      Model = firenode.model;

 const schema = {
  nome: {
    type: String,
    required: [true, 'REQUIRED_NAME']
  },
  email: {
    type: String,
    required: [true, 'REQUIRED_EMAIL']
  },
  senha: {
    type: String
  },
  idGateway: {
    type: String
  }, 
  imagemURL: {
    type: String
  },
  premium: {
    type: Boolean
  },
  segundoPlano: {
    type: Boolean
  },
  assinturas: {
    type: Array,
    default: []
  },
  giftcards: {
    type: Array,
    default: []
  },
  veiculosDisponiveis: {
    type: Number,
    default: 0
  },
  papel: {
    type: Number,
    required: true,
    enum: [1, 99],
    default: 1
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  },
  dataNascimento: {
    type: String
  },
  premiumValidoAte: {
    type: String
  },
  idPushNotification: {
    type: String
  },
  veiculos: {
    type: Object
  },
  pets: {
    type: Object
  },
  pessoas: {
    type: Object
  }
};

const UsuarioModel = new firenode.schema(schema);

module.exports = Model.ref('/usuarios', UsuarioModel);
