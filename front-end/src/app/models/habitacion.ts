export class Habitacion {
    constructor(_id = '', numero = '', piso = '', descripcion = '', caracteristicas = '', precioDiario= 0,estado = false, tipo=''){
        this._id = _id;
        this.numero = numero;
        this.piso = piso;
        this.descripcion = descripcion;
        this.caracteristicas = caracteristicas;
        this.precioDiario = precioDiario;
        this.estado = estado;
        this.tipo = tipo;
    }
    _id: string;
    numero: string;
    piso: string;
    descripcion: string;
    caracteristicas: string;
    precioDiario: number;
    estado: boolean;
    tipo: string;
}