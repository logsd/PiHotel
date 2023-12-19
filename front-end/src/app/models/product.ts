export class Product {
    constructor(_id = '', nombre = '', descripcion = '', precio = 0, stock = 0){
        this._id = _id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
}