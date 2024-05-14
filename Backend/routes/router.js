const router = require("express").Router()

// Local ficheiros
const serviceController = require("../controllers/serviceConstroller");
const carroController = require("../controllers/carroController");

// Routing
const servicesRouter= require("./services")
const carrosRouter= require("./carros")

router.use("/", servicesRouter);
router.use("/", carrosRouter);

module.exports = router;