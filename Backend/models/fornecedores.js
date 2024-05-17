const mongoose = require("mongoose");

const fornecedorSchema = new Schema ({
    Nome: { type: String, required: true },
    NIF: { type: Number, required: true },
    IBAN: { type: Number, required: true },
    Telemovel: { type: Number, required: true }
},
{timestamps: true} //guarda a data de criação do registo
);

const Fornecedor = mongoose.model("Fornecedor", fornecedorSchema)

module.exports = {
    Fornecedor,
    fornecedorSchema,
}