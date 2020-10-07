const firenode = require('../lib/firenode'),
    Model = firenode.model;

const schema = {

    id: {
        type: String,
        required: [true, '']
    },
    idEvento: {
        type: String,
        required: [true, '']
    },
    idUsuario: {
        type: String,
        required: [true, '']
    },
    descricao: {
        type: String,
        required: [false, '']
    },
    setor: {
        type: Number,
        required: [true, 'O campo "setor" é obrigatório']
    },
    tipo: {
        type: Number,
        required: [true, 'O campo "tipo" é obrigatório']
    },
    dataCriacao: {
        type: String,
        required: [true, 'O campo "dataCriacao" é obrigatório']
    },
    dataValidacao: {
        type: String,
        required: [true, 'O campo "dataValidacao" é obrigatório']
    },
    validado: {
        type: Boolean,
        required: [true, 'O campo "validado" é obrigatório']
    },
    valor: {
        type: Number,
        required: [true, 'O campo "valor" é obrigatório']
    },
};

const TicketModel = new firenode.schema(schema);

module.exports = Model.ref('/ticket', TicketModel);
