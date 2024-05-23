const express = require("express");
const router = require("express").Router()

// Local ficheiros
const serviceController = require("../controllers/serviceConstroller");
const carroController = require("../controllers/carroController");
const clienteConstroller = require("../controllers/clienteController");
const funcionarioController = require("../controllers/funcionarioController");
const fornecedorController = require("../controllers/fornecedorController");
const userController = require("../controllers/userController");
const compraController = require("../controllers/compraController");



// Routing
const servicesRouter= require("./services")
const carrosRouter= require("./carros")
const clientesRouter = require("./clientes")
const funcionariosRouter = require("./funcionarios")
const fornecedorRouter = require("./fornecedores")
const userRoutes = require("./users");
const compraRoutes = require('./compras');





router.use("/", servicesRouter);
router.use("/", carrosRouter);
router.use("/", clientesRouter);
router.use("/", funcionariosRouter);
router.use("/", fornecedorRouter);
router.use("/users", userRoutes);
router.use("/compras", compraRoutes);


router.get("/", (req, res) => {
    res.send("API is working");
});

module.exports = router;