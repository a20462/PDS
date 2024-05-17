const router = require("express").Router()

const fornecedorController = require("../controllers/fornecedorController")

// Funções

//ADICIONAR
router.route("/fornecedores").post((req, res) => fornecedorController.create(req,res)); 
//LISTAGEM ALL
router.route("/fornecedores").get((req, res) => fornecedorController.getAll(req, res));
//LISTAGEM BY ID
router.route("/fornecedores/:id").get((req, res) => fornecedorController.get(req, res));
//APAGAR BY ID
router.route("/fornecedores/:id").delete((req, res) => fornecedorController.delete(req, res));
//UPDATE BY ID
router.route("/fornecedores/:id").put((req, res) => fornecedorController.update(req,res));

module.exports = router;
