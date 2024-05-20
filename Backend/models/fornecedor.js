const mongoose = require("mongoose");

const fornecedorSchema = new mongoose.Schema ({
    nome: { type: String, required: true },
    nif: { type: Number, required: true },
    iban: { type: String, required: true },
    telemovel: { type: Number, required: true }
},
{timestamps: true} //guarda a data de criação do registo
);

const Fornecedor = mongoose.model("Fornecedor", fornecedorSchema)

module.exports = {
    Fornecedor,
    fornecedorSchema,
}