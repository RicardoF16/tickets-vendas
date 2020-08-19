const firenode = require('../lib/firenode'),
      Model = firenode.model;

 const schema = {
    diaEvento: {
    type: String,
    required: [true, 'REQUIRED_DIA_DO_EVENTO']
  },
  valor: {
    type: String,
    required: [true, 'VALOR_TICKET']
  },
  lote: {
    type: String,
    required: [true, 'LOTE_TICKET']
  },
  qrcode: {
    type: String,
    required: [true, 'TICKET_QRCODE']
  },
  utilizado: {
    type: String,
    required: [true, 'TICKET_UTILIZADO']
  },
  setor: {
    type: String,
    required: [true, 'SETOR']
  },
  dataCriacao: {
    type: String,
    required: [true, 'DATA_CRIACAO']
  },
  diaSemana: {
    type: String,
    required: [true, 'DIA_SEMANA']
  },
  diaMes: {
    type: String,
    required: [true, 'DIA_MES']
  },
  descricaoMes: {
    type: String,
    required: [true, 'DESCRICAO_MES']
  }
  
};

const meusTicketsModel = new firenode.schema(schema);

module.exports = Model.ref('/meusTickets', meusTicketsModel);
