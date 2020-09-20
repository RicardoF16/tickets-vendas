const firenode = require('../lib/firenode'),
      Model = firenode.model;

 const schema = {
  
  descricaoEvento: {
    type: String,
    required: [true, 'DESCRICAO_EVENTO']
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
  setor: {
    type: String,
    required: [true, 'SETOR']
  },
  dataCriacao: {
    type: String,
    required: [true, 'DATA_CRIACAO']
  },
  idUser: {
    type: String,
    required: [true, 'IDUSUARIO']
  },
  
  descricaoDiaSemana: {
    type: String,
    required: [true, 'DESCRICAO_DIA_SEMANA']
  },
  descricaoMes: {
    type: String,
    required: [true, 'DESCRICAO_MES']
  },
  diaNoMes: {
    type: String,
    required: [true, 'DIA_NO_MES']
  },
  ano: {
    type: String,
    required: [true, 'AMO']
  },
  dataEvento: {
    type: String,
    required: [true, 'DATAEVENTO']
  },
  dataValidacao:{
    type: String,
    required: ['DATA_VALIDACAO']
  },
  horaValidacao:{
    type: String,
    required: ['HORA_VALIDACAO']
  }
};

const meusTicketsModel = new firenode.schema(schema);

module.exports = Model.ref('/meusTickets', meusTicketsModel);
