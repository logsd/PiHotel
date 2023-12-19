const Hab = require('../models/habitacion');
const habitacionCtrl = {};

habitacionCtrl.getHabitaciones = async (req,res) => {
    const habitaciones = await Hab.find();
    res.json(habitaciones);
}

habitacionCtrl.createHabitacion = async (req,res) => {
 
    const newHab ={
        numero : req.body.numero,
        piso : req.body.piso,
        descripcion : req.body.descripcion,
        caracteristicas : req.body.caracteristicas,
        precioDiario : req.body.precioDiario, 
        estado: req.body.estado,
        tipo : req.body.tipo
    };

    Hab.create (newHab, (err, habitacion)=>{
        if(err && err.code === 11000)return res.status(409).send('El chabitacionya existe!')
        if(err) return res.status(500).send('Server error');

        const dataHab ={
            numero : habitacion.numero,
            piso : habitacion.piso,
            descripcion : habitacion.descripcion,
            caracteristicas : habitacion.caracteristicas,
            precioDiario : habitacion.precioDiario, 
            estado: habitacion.estado,
            tipo : habitacion.tipo
        }

        // response

        res.send({habitacion, dataHab})
    })
}

habitacionCtrl.getHabitacion = async (req,res) => {
    const habitacion = await Hab.findById(req.params.id);
    res.json(habitacion);
}

habitacionCtrl.editHabitacion = async (req,res) => {
    const { id } = req.params;
    const habitacion = {
        numero:  req.body.numero,
        piso : req.body.piso,
        descripcion : req.body.descripcion,
        caracteristicas : req.body.caracteristicas,
        precioDiario : req.body.precioDiario,
        estado: req.body.estado,
        tipo: req.body.tipo
    }
    await Hab.findByIdAndUpdate(id , { $set: habitacion}, { new: true});
    res.json({
        status: 'habitacion updated'
    });
}

habitacionCtrl.deleteHabitacion = async (req,res) => {
 await Hab.findByIdAndRemove(req.params.id)
 res.json({ status: 'Hab Deleted' });
}

module.exports = habitacionCtrl;