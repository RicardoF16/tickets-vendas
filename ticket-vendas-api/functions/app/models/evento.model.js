const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  
  id: {
    type: String,
    required: [true, '']
  },  
  titulo: {
    type: String,
    required: [true, 'O Campo titulo é obrigatório']
  },
  descricao: {
    type: String,
    required: [true, 'O Campo descrição é obrigatório']
  },
  dataInicio: {
    type: String,
    required: [true, 'O campo "dataInicio" é obrigatório']
  },
  dataFim: {
    type: String,
    required: [true, 'O campo "dataFim" é obrigatório']
  },
  imagemUrl: {
    type: String,
    required: [true, 'O campo "imagemUrl" é obrigatório']
  },
  ativo: {
    type: Boolean,
    required: [true, 'O campo "ativo" é obrigatório']
  },
  tipo: {
    type: Number,
    required: [true, 'O campo "tipo" é obrigatório']
  },
  diasEvento: {
    type: Array,
    required: [false, '']
  }
};

const EventoModel = new firenode.schema(schema);

module.exports = Model.ref('/evento', EventoModel);
