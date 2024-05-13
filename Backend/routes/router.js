const router = require("express").Router()

const serviceController = require("../controllers/serviceConstroller");
// Servicos Router
const servicesRouter= require("./services")

router.use("/", servicesRouter);

module.exports = router;