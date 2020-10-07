const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  
  idUsuario: {
    type: String,
    required: [true, 'O Usuário deve ser informado']
  },  
  qtd: {
    type: Number,
    required: [false, 'A Quantidade deve ser informada na cortesia']
  }
};

const CortesiaModel = new firenode.schema(schema);

module.exports = Model.ref('/cortesia', CortesiaModel);
