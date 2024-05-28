const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: false },
    telemovel: { type: String, required: true },
    nif: { type: String, required: true },

});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = mongoose.model('Cliente', ClienteSchema);
