const router = require("express").Router()

// Local ficheiros
const serviceController = require("../controllers/serviceConstroller");
const carroController = require("../controllers/carroController");
const clienteConstroller = require("../controllers/clienteController");
const funcionarioController = require("../controllers/funcionarioController");
const fornecedorController = require("../controllers/fornecedorController");
const userController = require("../controllers/userController");

// Routing
const servicesRouter= require("./services")
const carrosRouter= require("./carros")
const clientesRouter = require("./clientes")
const funcionariosRouter = require("./funcionarios")
const fornecedorRouter = require("./fornecedores")
const userRouter = require("./users")



router.use("/", servicesRouter);
router.use("/", carrosRouter);
router.use("/", clientesRouter);
router.use("/", funcionariosRouter);
router.use("/", fornecedorRouter);
router.use("/", userRouter);

module.exports = router;