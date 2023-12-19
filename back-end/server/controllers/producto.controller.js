const Producto = require('../models/producto');
const productoCtrl = {};

productoCtrl.getProductos = async (req,res) => {
    const productos = await Producto.find();
    res.json(productos);
}

productoCtrl.createProducto = async (req,res) => {
 
    const newProducto ={
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        precio : req.body.precio,
        stock : req.body.stock,
    };

    Producto.create (newProducto, (err, producto)=>{
        if(err && err.code === 11000)return res.status(409).send('El email ya existe!')
        if(err) return res.status(500).send('Server error');

        const dataProducto ={
            nombre : producto.nombre,
            descripcion : producto.descripcion,
            precio : producto.precio,
            stock : producto.stock,

        }

        // response

        res.send({producto, dataProducto})
    })
}


productoCtrl.getProducto = async (req,res) => {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
}

productoCtrl.editProducto = async (req,res) => {
    const { id } = req.params;
    const producto = {
        nombre:  req.body.nombre,
        precio:  req.body.precio,
        descripcion:  req.body.descripcion,
        stock:  req.body.stock,
    }
    await Producto.findByIdAndUpdate(id , { $set: producto}, { new: true});
    res.json({
        status: 'producto updated'
    });
}

productoCtrl.deleteProducto = async (req,res) => {
 await Producto.findByIdAndRemove(req.params.id)
 res.json({ status: 'producto Deleted' });
}

module.exports = productoCtrl;