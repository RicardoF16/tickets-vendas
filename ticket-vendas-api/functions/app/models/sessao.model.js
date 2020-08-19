const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  token: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    required: true,
    default: true
  }
};

const SessaoModel = new firenode.schema(schema);

module.exports = Model.ref('/sessoes', SessaoModel);
