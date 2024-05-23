const { Cliente } = require('../models/cliente');
const { Carro } = require('../models/carros');

exports.ComprarCarro = async (req, res) => {
    try {
        const { clienteNome, carroId } = req.body;

        console.log(`Iniciando compra: clienteNome=${clienteNome}, carroId=${carroId}`);

        const cliente = await Cliente.findOne({ nome: clienteNome });

        if (!cliente) {
            console.error(`Cliente não encontrado: ${clienteNome}`);
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        const carro = await Carro.findById(carroId);

        if (!carro) {
            console.error(`Carro não encontrado: ${carroId}`);
            return res.status(404).json({ message: "Carro não encontrado" });
        }

        if (carro.dono && carro.dono.id) {
            console.error(`Carro já foi comprado: ${carroId}`);
            return res.status(400).json({ message: "Carro já foi comprado" });
        }
        

        carro.dono = { id: cliente._id, nome: cliente.nome };
        await carro.save();

        console.log(`Carro comprado com sucesso: carroId=${carroId}, clienteNome=${clienteNome}`);

        res.status(200).json({ message: "Carro comprado com sucesso", carro });
    } catch (error) {
        console.error('Erro no servidor', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.listarCompras = async (req, res) => {
    try {
        const carrosComprados = await Carro.find({ 'dono.id': { $ne: null } });
        res.status(200).json({ carrosComprados });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.cancelarCompra = async (req, res) => {
    try {
        const { carroId } = req.body;

        const carro = await Carro.findById(carroId);

        if (!carro) {
            return res.status(404).json({ message: "Carro não encontrado" });
        }

        if (!carro.dono.id) {
            return res.status(400).json({ message: "Este carro não foi comprado" });
        }

        carro.dono = null;
        await carro.save();
        
        res.status(200).json({ message: "Compra cancelada com sucesso", carro });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};