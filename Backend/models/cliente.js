const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    telemovel: { type: Number, required: true },
    nif: { type: Number, required: true },
},
{timestamps: true} //guarda a data de criação do registo
);

const Cliente = mongoose.model("Cliente", clienteSchema)

module.exports = {
    Cliente,
    clienteSchema,
}