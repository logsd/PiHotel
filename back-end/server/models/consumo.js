const mongoose = require('mongoose');
const {Schema} = mongoose;
const ConsumoSchema = new Schema({
    reserva: {
        type: mongoose.Types.ObjectId, ref: 'Reserva'
    },
    producto: {
        type: mongoose.Types.ObjectId, ref: 'Producto'
    },
    cantidad: {
        type: Number
    },
    precioVenta: {
        type: Number
    },
    estado: {
        type: String
    }   
});
ConsumoSchema.statics ={
    create : function (data, cb){
        const consumo = new this(data);
        consumo.save(cb);
    }
}


module.exports = mongoose.model('Consumo', ConsumoSchema);