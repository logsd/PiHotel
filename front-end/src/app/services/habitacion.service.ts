import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habitacion } from '../models/habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {


  selectedHabitacion: Habitacion;
  habitaciones: Habitacion[] | undefined;
  readonly URL_API = 'http://localhost:3000/api/habitacion';


  constructor(private http:HttpClient) {
    this.selectedHabitacion = new Habitacion();
   }

   getHabitaciones(){
    return this.http.get(this.URL_API);
  }
  getHabitacion(_id:string){
    return this.http.get(this.URL_API+ `/${_id}`);
  }

  postHabitacion(habitacion : Habitacion) {
    return this.http.post(this.URL_API+ `/`, habitacion);
  }

  putHabitacion(habitacion : Habitacion) {
    return this.http.put(this.URL_API + `/${habitacion._id}`, habitacion);
  }

  deleteHabitacion(_id:string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
