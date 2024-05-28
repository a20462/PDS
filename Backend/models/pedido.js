const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    descricao: String
  });

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;