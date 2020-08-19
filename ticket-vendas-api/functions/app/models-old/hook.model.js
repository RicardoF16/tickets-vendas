const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  data: {
    type: Object,
    required: [true, 'O campo nome é obrigatório']
  },
  createdAt: {
    type: Date,
  },
};

const HookModel = new firenode.schema(schema);

module.exports = Model.ref('/hooks', HookModel);
