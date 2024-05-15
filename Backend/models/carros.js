const mongoose = require("mongoose");

const carroSchema = new mongoose.Schema ({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    kms: { type: Number, required: true },
    combustivel: { type: String, required: true },
    ano: { type: Number, required: true },
    caixa: { type: String, required: true },
    img: { type: String, required: true },
    garantia: { type: String, required: true },
    preco: { type: String, required: true },
    cor: { type: String, required: true }
},
{timestamps: true} //guarda a data de criação do registo
);

const Carro = mongoose.model("Carro", carroSchema)

module.exports = {
    Carro,
    carroSchema,
}