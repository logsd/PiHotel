import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  selectedList: List;
  lists: List[] | undefined;
  readonly URL_API = 'http://localhost:3000/api/lists';

  constructor(private http:HttpClient) {
    this.selectedList = new List();
   }

   getLists(){
    return this.http.get(this.URL_API);
  }

  postList(List : List) {
    return this.http.post(this.URL_API, List);
  }

  putList(list : List) {
    return this.http.put(this.URL_API + `/${list._id}`, list);
  }

  deleteList(_id:string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
