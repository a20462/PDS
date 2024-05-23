const mongoose = require('mongoose');

const CarroSchema = new mongoose.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    kms: { type: Number, required: true },
    combustivel: { type: String, required: true },
    ano: { type: Number, required: true },
    caixa: { type: String, required: true },
    img: { type: String, required: true },
    garantia: { type: String, required: true },
    preco: { type: Number, required: true },
    cor: { type: String, required: true },
    dono: { 
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', default: null },
        nome: { type: String, default: null }
     }
});

const Carro = mongoose.model('Carro', CarroSchema);

module.exports = {
    Carro,
    CarroSchema,
}
