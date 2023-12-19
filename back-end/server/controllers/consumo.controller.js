const Consumo = require('../models/consumo');
const consumoCtrl = {};

consumoCtrl.getConsumos = async (req,res) => {
    const consumos = await Consumo.find();
    res.json(consumos);
}

consumoCtrl.createConsumo = async (req,res) => {
 
    const newConsumo ={
        reserva : req.body.reserva,
        producto : req.body.producto,
        cantidad : req.body.cantidad,
        precioVenta : req.body.precioVenta,
        estado: req.body.estado
    };

    Consumo.create (newConsumo, (err, consumo)=>{
        if(err && err.code === 11000)return res.status(409).send('El consumo ya existe!')
        if(err) return res.status(500).send('Server error');

        const dataConsumo ={
            reserva : consumo.reserva,
            producto : consumo.producto,
            cantidad : consumo.cantidad,
            precioVenta : consumo.precioVenta,
            estado:consumo.estado
        }

        // response

        res.send({consumo, dataConsumo})
    })
}

consumoCtrl.getConsumo = async (req,res) => {
    const consumo = await Consumo.findById(req.params.id);
    res.json(consumo);
}

consumoCtrl.editConsumo = async (req,res) => {
    const { id } = req.params;
    const consumo = {
        reserva:  req.body.reserva,
        producto: req.body.producto,
        cantidad: req.body.cantidad,
        precioVenta: req.body.precioVenta,
        estado: req.body.estado 
    }
    await Consumo.findByIdAndUpdate(id , { $set: consumo}, { new: true});
    res.json({
        status: 'consumo updated'
    });
}

consumoCtrl.deleteConsumo = async (req,res) => {
 await Consumo.findByIdAndRemove(req.params.id)
 res.json({ status: 'Consumo Deleted' });
}

module.exports = consumoCtrl;