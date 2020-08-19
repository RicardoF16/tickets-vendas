const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  name: {
    type: String,
    required: [true, 'O campo name é obrigatório']
  },
  email: {
    type: String,
    required: [true, 'O campo email é obrigatório']
  }, 
  phone: {
    type: String,
    required: [true, 'O campo phone é obrigatório']
  },
  description: {
    type: String,
    required: [true, 'O campo description é obrigatório']
  }
};

const SuporteModel = new firenode.schema(schema);

module.exports = Model.ref('/suporte', SuporteModel);
