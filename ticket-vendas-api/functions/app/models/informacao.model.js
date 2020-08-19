const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  diaEvento: {
    type: String,
    required: [true, 'REQUIRED_DATA']
  },
  valorInicial: {
    type: String,
    required: [false, 'REQUIRED_VALOR_INICIAL']
  },
  valorFinal: {
    type: String,
    required: [false, 'REQUIRED_VALOR_FINAL']
  },
  dataCriacao: {
    type: String,
    required: [true, 'REQUIRED_DATA_CRIACAO']
  },
  diaSemana: {
    type: String,
    required: [true, 'REQUIRED_DIA_SEMANA']
  },
  diaMes: {
    type: String,
    required: [true, 'REQUIRED_DIA_MES']
  },
  DescricaoMes: {
    type: String,
    required: [true, 'REQUIRED_DESCRICAO_MES']
  }

};

const InformacaoModel = new firenode.schema(schema);

module.exports = Model.ref('/informacoes', InformacaoModel);
