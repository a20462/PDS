const router = require("express").Router()

const clienteController = require("../controllers/clienteController")

// Funções

//ADICIONAR
router.route("/clientes").post((req, res) => clienteController.create(req,res)); 
//LISTAGEM ALL
router.route("/clientes").get((req, res) => clienteController.getAll(req, res));
//LISTAGEM BY ID
router.route("/clientes/:id").get((req, res) => clienteController.get(req, res));
//APAGAR BY ID
router.route("/clientes/:id").delete((req, res) => clienteController.delete(req, res));
//UPDATE BY ID
router.route("/clientes/:id").put((req, res) => clienteController.update(req,res));

module.exports = router;
