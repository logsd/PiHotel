const mongoose = require('mongoose');
const {Schema} = mongoose;
const ProductoSchema = new Schema({
    nombre: {
        type: String
        },
    descripcion: {
        type: String
    },
    precio: {
        type: Number
        },
    stock: {
        type: Number
    },
});
ProductoSchema.statics ={
    create : function (data, cb){
        const producto = new this(data);
        producto.save(cb);
    }
}


module.exports = mongoose.model('Producto', ProductoSchema);