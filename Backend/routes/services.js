const router = require("express").Router()

const serviceController = require("../controllers/serviceConstroller")

// Funções

//ADICIONAR
router.route("/services").post((req, res) => serviceController.create(req,res)); 
//LISTAGEM ALL
router.route("/services").get((req, res) => serviceController.getAll(req, res));
//LISTAGEM BY ID
router.route("/services/:id").get((req, res) => serviceController.get(req, res));
//APAGAR BY ID
router.route("/services/:id").delete((req, res) => serviceController.delete(req, res));
//UPDATE BY ID
router.route("/services/:id").put((req, res) => serviceController.update(req,res));

module.exports = router;
