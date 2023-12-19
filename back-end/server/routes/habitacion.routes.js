const express = require('express');
const router = express.Router();
const habitacionCtrl = require('../controllers/habitacion.controller');

router.get('/', habitacionCtrl.getHabitaciones);
router.post('/', habitacionCtrl.createHabitacion);
router.get('/:id', habitacionCtrl.getHabitacion);
router.put('/:id', habitacionCtrl.editHabitacion);
router.delete('/:id', habitacionCtrl.deleteHabitacion);

module.exports = router;