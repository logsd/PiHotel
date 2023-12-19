import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Metodo } from '../models/metodo';

@Injectable({
  providedIn: 'root'
})
export class MetodoService {

  selectedMetodo: Metodo;
  metodos: Metodo[] | undefined;
  readonly URL_API = 'http://localhost:3000/api/metodo';

  constructor(private http:HttpClient) {
    this.selectedMetodo = new Metodo();
   }

   getMetodos(){
    return this.http.get(this.URL_API);
  }
  getMetodo(_id:string){
    return this.http.get(this.URL_API+ `/${_id}`);
  }

  postMetodo(metodo : Metodo) {
    return this.http.post(this.URL_API+ `/`, metodo);
  }

  putMetodo(metodo : Metodo) {
    return this.http.put(this.URL_API + `/${metodo._id}`, metodo);
  }

  deleteMetodo(_id:string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
