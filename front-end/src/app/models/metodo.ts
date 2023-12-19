export class Metodo {
    constructor(_id = '', tipo = '', reserva = '', total = 0, fechaEmision = '', fechaPago= ''){
        this._id = _id;
        this.tipo = tipo;
        this.reserva = reserva;
        this.total = total;
        this.fechaEmision = fechaEmision;
        this.fechaPago= fechaPago;


    }
    _id: string;
    tipo: string;
    reserva: string;
    total: number;
    fechaEmision: string;
    fechaPago: string;

}