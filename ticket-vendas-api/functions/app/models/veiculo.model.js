const firenode = require('../lib/firenode'),
      Model = firenode.model;

 const schema = {
  marca: {
    type: String,
    required: [true, 'REQUIRED_MARCA']
  },
  idAssinatura: {
    type: String,
    // required: [true, 'REQUIRED_SIGNATURE']
  },
  desabilitado: {
    type: Boolean, 
    default: false
  },
  modelo: {
    type: String,
    required: [true, 'REQUIRED_MODELO']
  },
  ano: {
    type: Number,
    required: [true, 'REQUIRED_ANO']
  },
  imagemURL: {
    type: String,
    required: [true, 'REQUIRED_IMAGE_URL']
  },
  observacoes: {
    type: String,
    default: ''
  },
  placa: {
    type: String,
    required: [true, 'REQUIRED_PLACA']
  },
  cor: {
    type: String,
    required: [true, 'REQUIRED_COR']
  }
};

const VeiculoModel = new firenode.schema(schema);

module.exports = Model.ref('/veiculos', VeiculoModel);
