const mongoose = require("mongoose");

const funcionarioSchema = new Schema ({
    Nome: { type: String, required: true },
    DataNasc: { type: Date, required: true },
    NIF: { type: Number, required: true },
    IBAN: { type: Number, required: true },
    Telemovel: { type: Number, required: true }
},
{timestamps: true} //guarda a data de criação do registo
);

const Funcionario = mongoose.model("Funcionario", funcionarioSchema)

module.exports = {
    Funcionario,
    fornecedorSchema,
}