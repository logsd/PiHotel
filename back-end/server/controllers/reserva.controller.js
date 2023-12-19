const Reserva = require('../models/reserva');
const reservaCtrl = {};

reservaCtrl.getReservas = async (req,res) => {
    const reservas = await Reserva.find();
    res.json(reservas);
}

reservaCtrl.createReserva = async (req,res) => {
 console.log(req.body)
    const newReserva ={
        cliente : req.body.cliente,
        habitacion : req.body.habitacion,
        tipoReserva : req.body.tipoReserva,
        fechaReserva : req.body.fechaReserva,
        fechaEntrada : req.body.fechaEntrada, 
        fechaSalida: req.body.fechaSalida,
        costoAlojamiento : req.body.costoAlojamiento,
        estado: req.body.estado
    };

    Reserva.create (newReserva, (err, reserva)=>{
        if(err && err.code === 11000)return res.status(409).send('La reserva ya existe!')
        if(err) return res.status(500).send('Server error');

        const dataReserva ={
            cliente : reserva.cliente,
            habitacion : reserva.habitacion,
            tipoReserva : reserva.tipoReserva,
            fechaReserva : reserva.fechaReserva,
            fechaEntrada : reserva.fechaEntrada, 
            fechaSalida: reserva.fechaSalida,
            costoAlojamiento : reserva.costoAlojamiento,
            estado: reserva.estado
        }

        // response

        res.send({reserva, dataReserva})
    })
}

reservaCtrl.getReserva = async (req,res) => {
    const reserva = await Reserva.findById(req.params.id);
    res.json(reserva);
}

reservaCtrl.editReserva = async (req,res) => {
    const { id } = req.params;
    const reserva = {
        cliente:  req.body.cliente,
        habitacion: req.body.habitacion,
        fechaReserva: req.body.fechaReserva,
        fechaEntrada: req.body.fechaEntrada,
        fechaSalida: req.body.fechaSalida,
        costoAlojamiento: req.body.costoAlojamiento,
        estado: req.body.estado
    }
    await Reserva.findByIdAndUpdate(id , { $set: reserva}, { new: true});
    res.json({
        status: 'reserva updated'
    });
}

reservaCtrl.deleteReserva = async (req,res) => {
 await Reserva.findByIdAndRemove(req.params.id)
 res.json({ status: 'Reserva Deleted' });
}

module.exports = reservaCtrl;