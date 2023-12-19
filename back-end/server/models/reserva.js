const mongoose = require('mongoose');
const {Schema} = mongoose;
const ReservaSchema = new Schema({
    cliente: {type: mongoose.Types.ObjectId, ref: 'User'}
    ,
    habitacion: {
       type: mongoose.Types.ObjectId, ref: 'Habitacion'
    },
    tipoReserva: {
        type: String
    },
    fechaReserva:{
        type: String
    },
    fechaEntrada: { type: String},
    fechaSalida: { type: String},
    costoAlojamiento :{
        type: Number
    },
    estado: {type: Boolean}
        
});
ReservaSchema.statics ={
    create : function (data, cb){
        const reserva = new this(data);
        reserva.save(cb);
    }
}

module.exports = mongoose.model('Reserva', ReservaSchema);