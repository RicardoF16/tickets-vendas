const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  
  id: {
    type: String,
    required: [true, '']
  },  
  descricao: {
    type: String,
    required: [false, '']
  },
  cortesia: {
    type: Boolean,
    default: false
  },
  qtdeTicketsVendidos: {
    type: Number,
    required: [true, 'O campo "qtdeTicketsVendidos" é obrigatório']
  },
  qtdeTotalTickets: {
    type: Number,
    required: [true, 'O campo "qtdeTotalTickets" é obrigatório']
  },
  setor: {
    type: Number,
    required: [true, 'O campo "setor" é obrigatório']
  },
  valor: {
    type: Number,
    required: [true, 'O campo "valor" é obrigatório']
  },
  listaCortesia: {
    type: Array,
    required: [false, '']
  }
};

const LoteModel = new firenode.schema(schema);

module.exports = Model.ref('/lote', LoteModel);
