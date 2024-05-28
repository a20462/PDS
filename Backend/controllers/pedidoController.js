const Pedido = require("../models/pedido");

const pedidoController = {
  create: async (req, res) => {
    try {
      const pedido = new Pedido({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        descricao: req.body.descricao
      });
      const novoPedido = await pedido.save();
      res.status(201).json(novoPedido);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const pedidos = await Pedido.find();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const id = req.params.id;
      // Remova o pedido do banco de dados usando o ID
      await PedidoModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Pedido removido com sucesso" });
    } catch (error) {
      console.error("Erro ao remover o pedido:", error);
      res.status(500).json({ message: "Erro ao remover o pedido" });
    }
  }

};


module.exports = pedidoController;
