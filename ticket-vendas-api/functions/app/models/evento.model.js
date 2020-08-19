const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  
  descricao: {
    type: String,
    required: [true, 'REQUIRED_DESCRICAO']
  },
  dataInicio: {
    type: Object,
    required: [true, 'O campo data de inicio do evento é obrigatório']
  },
  dataFim: {
    type: Object,
    required: [true, 'O campo data final do evento é obrigatório']
  }
};

const EventoModel = new firenode.schema(schema);

module.exports = Model.ref('/eventos', EventoModel);
