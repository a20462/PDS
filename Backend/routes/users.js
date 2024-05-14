const router = require("express").Router()

const userController = require("../controllers/userConstroller")

// Funções

//ADICIONAR
router.route("/users").post((req, res) => userController.create(req,res)); 
//LISTAGEM ALL
router.route("/users").get((req, res) => userController.getAll(req, res));
//LISTAGEM BY ID
router.route("/users/:id").get((req, res) => userController.get(req, res));
//APAGAR BY ID
router.route("/users/:id").delete((req, res) => usereController.delete(req, res));
//UPDATE BY ID
router.route("/users/:id").put((req, res) => userController.update(req,res));

module.exports = router;
