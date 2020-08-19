const firenode = require('../lib/firenode'),
      Model = firenode.model;

const schema = {
  codigo: {
    type: String,
    required: [true, 'O campo codigo é obrigatório']
  },
  serie: {
    type: Number,
    required: [true, 'O campo serie é obrigatório']
  },
  duracaoMeses: {
    type: Number,
    required: [true, 'O campo duração meses é obrigatório'],
    enum: [3, 6, 12, 24]
  },
  usado: {
    type: Boolean,
    default: false
  },
  usadoPor: {
    type: String
  }
};

const GiftcardModel = new firenode.schema(schema);

module.exports = Model.ref('/giftcards', GiftcardModel);
