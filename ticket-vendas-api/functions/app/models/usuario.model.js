const firenode = require('../lib/firenode'),
      Model = firenode.model;

 const schema = {
  nome: {
    type: String,
    required: [true, 'REQUIRED_NAME']
  },
  email: {
    type: String,
    required: [true, 'REQUIRED_EMAIL']
  },
  senha: {
    type: String
  },
  id: {
    type: String
  },
  uid: {
    type: String
  },
};



const UsuarioModel = new firenode.schema(schema);

module.exports = Model.ref('/usuarios', UsuarioModel);
