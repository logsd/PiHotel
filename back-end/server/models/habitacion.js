const mongoose = require('mongoose');
const {Schema} = mongoose;
const HabitacionSchema = new Schema({
    numero: {
        type: String
    },
    piso: {
        type: String
    },
    descripcion:{
        type: String
    },
    caracteristicas: {
        type: String
    },
    precioDiario:{
        type: Number
    },
    estado: {
        type: String
    },
    tipo: {
       type: String
    }
        
});

HabitacionSchema.statics ={
    create : function (data, cb){
        const habitacion = new this(data);
        habitacion.save(cb);
    }
}


module.exports = mongoose.model('Habitacion', HabitacionSchema);