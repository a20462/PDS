const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.post("/compra", compraController.ComprarCarro);
router.post("/cancelar", compraController.cancelarCompra);
router.get("/", compraController.listarCompras);

module.exports = router;
