const router = require("express").Router()

const funcionarioController = require("../controllers/funcionarioController")

// Funções

//ADICIONAR
router.route("/funcionarios").post((req, res) => funcionarioController.create(req,res)); 
//LISTAGEM ALL
router.route("/funcionarios").get((req, res) => funcionarioController.getAll(req, res));
//LISTAGEM BY ID
router.route("/funcionarios/:id").get((req, res) => funcionarioController.get(req, res));
//APAGAR BY ID
router.route("/funcionarios/:id").delete((req, res) => funcionarioController.delete(req, res));
//UPDATE BY ID
router.route("/funcionarios/:id").put((req, res) => funcionarioController.update(req,res));

module.exports = router;
