export class Consumo {
    constructor(_id = '', reserva = '', producto = '', cantidad = 0, precioVenta = 0, estado = false){
        this._id = _id;
        this.reserva = reserva;
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioVenta = precioVenta;
        this.estado = estado;
    }
    _id: string;
    reserva: string;
    producto: string;
    cantidad: number;
    precioVenta: number;
    estado: boolean;
}