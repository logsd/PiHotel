const Reserva = require('../models/reserva');
const reservaCtrl = {};

reservaCtrl.getReservas = async (req,res) => {
    const reservas = await Reserva.find();
    res.json(reservas);
}

reservaCtrl.createReserva = async (req,res) => {

    try {
         
        const { uri} = req.body;
       const existeReserva = await Reserva.findOne({ uri});
       if ( existeReserva ) {
           return res.status(400).json({
               ok: false,
               msg: 'Ya esta Postulado a esta Oferta',
               msj:'POSTULADO'
           });
       
          }  

const reserva = new Reserva(req.body);

       // GUARDAR UNA OPCION EN MongoDB
   await reserva.save()
           .then(data => {
               res.json(data);
           }).catch(err => {
               res.status(500).json({
                   msg: err.message
               });
           });
   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'Error inesperado... revisar logs'
       }); 
   }
    
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