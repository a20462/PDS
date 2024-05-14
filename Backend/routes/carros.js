const router = require("express").Router()

const carroController = require("../controllers/carroController")

// Funções

//ADICIONAR
router.route("/carros").post((req, res) => carroController.create(req,res)); 
//LISTAGEM ALL
router.route("/carros").get((req, res) => carroController.getAll(req, res));
//LISTAGEM BY ID
router.route("/carros/:id").get((req, res) => carroController.get(req, res));
//APAGAR BY ID
router.route("/carros/:id").delete((req, res) => carroController.delete(req, res));
//UPDATE BY ID
router.route("/carros/:id").put((req, res) => carroController.update(req,res));

module.exports = router;
