import { Reserva } from "./reserva";
import { Product } from "./product";

export class Consumo {
    _id: string | undefined;
    reserva: Reserva | undefined;
    producto: Product | undefined;
    cantidad: number | undefined;
    precioVenta: number | undefined;
    estado: string| undefined;
}