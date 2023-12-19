const mongoose = require('mongoose');
const {Schema} = mongoose;
const MetodoSchema = new Schema({
    tipo: {
        type: String,
    },
    reserva: {
        type: mongoose.Types.ObjectId, ref: 'Reserva'
    },
    total: {
        type : Number
    },
    fechaEmision: {
        type: Date, required: true, default: Date.now 
    },
    fechaPago:{
        type: Date, required: true, default: Date.now 
    }

});

MetodoSchema.statics ={
    create : function (data, cb){
        const metodo = new this(data);
        metodo.save(cb);
    }
}

module.exports = mongoose.model('Metodo', MetodoSchema);