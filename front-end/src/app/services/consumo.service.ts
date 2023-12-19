import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consumo } from '../models/consumo'; 

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  selectedConsumo: Consumo;
  consumos: Consumo[] | undefined;
  readonly URL_API = 'http://localhost:3000/api/producto';

    
  constructor(private http:HttpClient) { 
    this.selectedConsumo = new Consumo();
  }

  getConsumos(){
    return this.http.get(this.URL_API);
  }
  getConsumo(_id:string){
    return this.http.get(this.URL_API+ `/${_id}`);
  }

  postConsumo(consumo : Consumo) {
    return this.http.post(this.URL_API+ `/`, consumo);
  }

  putConsumo(consumo : Consumo) {
    return this.http.put(this.URL_API + `/${consumo._id}`, consumo);
  }

  deleteConsumo(_id:string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
