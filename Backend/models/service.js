var mongoose = require ("mongoose");

var { Schema } = mongoose; 

var serviceSchema = new mongoose.Schema ({
    tipo: { type: String, required: true }, // Limpeza / troca de oleo / manutenção completa etc
    nome: { type: String, required: true }, // João Silva
    email: { type: String, required: true }, // JSilva@gmail.com
    telemovel: { type: Number, required: true }, // 911222333
    estado: { type: String, required: true }, // Concluido / Pendente
    modelo: { type: String, required: true }, // 2020 Tesla Model S Performance Edition
    conta: { type: Number, required: true } // 45€
},
{timestamps: true} //guarda a data de criação do registo
);

const Service = mongoose.model("Service", serviceSchema)

module.exports = {
    Service,
    serviceSchema,
}