const express = require('express');
const router = express.Router();
const reservaCtrl = require('../controllers/reserva.controller');

router.get('/', reservaCtrl.getReservas);
router.post('/', reservaCtrl.createReserva);
router.get('/:id', reservaCtrl.getReserva);
router.put('/:id', reservaCtrl.editReserva);
router.delete('/:id', reservaCtrl.deleteReserva);

module.exports = router;