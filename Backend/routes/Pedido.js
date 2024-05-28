const router = require("express").Router()

const pedidoController = require("../controllers/pedidoController")

// Funções

//ADICIONAR
router.route("/").post((req, res) => pedidoController.create(req,res)); 
//LISTAGEM ALL
router.route("/").get((req, res) => pedidoController.getAll(req, res));
//REMOVER
router.delete("/pedidos/:id", pedidoController.remove);


module.exports = router;
