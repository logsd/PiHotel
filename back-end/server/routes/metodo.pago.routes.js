const express = require('express');
const router = express.Router();
const metodoCtrl = require('../controllers/metodo.pago.controller');

router.get('/', metodoCtrl.getMetodos);
router.post('/', metodoCtrl.createMetodo);
router.get('/:id', metodoCtrl.getMetodo);
router.put('/:id', metodoCtrl.editMetodo);
router.delete('/:id', metodoCtrl.deleteMetodo);

module.exports = router;