const express = require('express');
const router = express.Router();
const consumoCtrl = require('../controllers/consumo.controller');

router.get('/', consumoCtrl.getConsumos);
router.post('/', consumoCtrl.createConsumo);
router.get('/:id', consumoCtrl.getConsumo);
router.put('/:id', consumoCtrl.editConsumo);
router.delete('/:id', consumoCtrl.deleteConsumo);

module.exports = router;