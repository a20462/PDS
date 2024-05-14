const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telemovel: { type: Number, required: true }
});

const Cliente = mongoose.model("Cliente", clienteSchema)

module.exports = {
    Cliente,
    clienteSchema,
}