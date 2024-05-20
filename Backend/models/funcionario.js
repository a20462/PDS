const mongoose = require("mongoose");

const funcionarioSchema = new mongoose.Schema ({
    nome: { type: String, required: true },
    datanasc: { type: String, required: true },
    nif: { type: Number, required: true },
    iban: { type: String, required: true },
    telemovel: { type: Number, required: true }
},
{timestamps: true} //guarda a data de criação do registo
);

const Funcionario = mongoose.model("Funcionario", funcionarioSchema)

module.exports = {
    Funcionario,
    funcionarioSchema,
}