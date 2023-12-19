import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  selectedReserva: Reserva;
  reservas: Reserva[] | undefined;
  readonly URL_API = 'http://localhost:3000/api/reserva';


  constructor(private http:HttpClient) {
    this.selectedReserva = new Reserva();
   }

   getReservas(){
    return this.http.get(this.URL_API);
  }
  getReserva(_id:string){
    return this.http.get(this.URL_API+ `/${_id}`);
  }

  postReserva(reserva : Reserva) {
    return this.http.post(this.URL_API+ `/`, reserva);
  }

  putReserva(reserva : Reserva) {
    return this.http.put(this.URL_API + `/${reserva._id}`, reserva);
  }

  deleteReserva(_id:string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
