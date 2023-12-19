const Metodo = require('../models/metodo.pago');
const metodoCtrl = {};

metodoCtrl.getMetodos = async (req,res) => {
    const metodos = await Metodo.find();
    res.json(metodos);
}

metodoCtrl.createMetodo = async (req,res) => {

    const newMetodo ={
        tipo : req.body.tipo,
        reserva : req.body.reserva,
        total : req.body.total,
        fechaEmision : req.body.fechaEmision,
        fechaPago : req.body.fechaPago
    };
    Metodo.create (newMetodo, (err, metodo)=>{
        if(err && err.code === 11000)return res.status(409).send('El metodo ya existe!')
        if(err) return res.status(500).send('Server error');

        const dataMetodo ={
            tipo : metodo.tipo,
            reserva : metodo.reserva,
            total : metodo.total,
            fechaEmision : metodo.fechaEmision,
            fechaPago : metodo.fechaPago
        }

        // response

        res.send({metodo, dataMetodo})
    })
}

metodoCtrl.getMetodo = async (req,res) => {
    const metodo = await Metodo.findById(req.params.id);
    res.json(metodo);
}

metodoCtrl.editMetodo = async (req,res) => {
    const { id } = req.params;
    const metodo = {
        tipo:  req.body.tipo,
        reserva: req.body.reserva,
        total: req.body.total,
        fechaEmision : req.body.fechaEmision,
        fechaPago : req.body.fechaPago
    }
    await Metodo.findByIdAndUpdate(id , { $set: metodo}, { new: true});
    res.json({
        status: 'metodo updated'
    });
}

metodoCtrl.deleteMetodo = async (req,res) => {
 await Metodo.findByIdAndRemove(req.params.id)
 res.json({ status: 'metodo Deleted' });
}

module.exports = metodoCtrl;