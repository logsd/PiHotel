import { Habitacion } from "./habitacion";
import { User } from "./user";
export class Reserva {

    _id: string | undefined;
    cliente: User| undefined;
    habitacion: Habitacion| undefined;
    tipoReserva: string| undefined;
    fechaReserva: string| undefined;
    fechaEntrada: string| undefined;
    fechaSalida: string| undefined;
    costoAlojamiento: number| undefined;
    estado: boolean| undefined;

}