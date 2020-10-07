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
  dataInicio: {
    type: String,
    required: [true, 'O campo data de inicio do evento é obrigatório']
  },
  dataFim: {
    type: String,
    required: [true, 'O campo data final do evento é obrigatório']
  },
  lotes: {
    type: Array,
    required: [false, '']
  }
};

const DiaEventoModel = new firenode.schema(schema);

module.exports = Model.ref('/dia_evento', DiaEventoModel);
