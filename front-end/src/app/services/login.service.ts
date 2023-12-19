import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { JwtResponseI } from '../interfaces/jwt-response';
import { User} from '../models/user';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
@Injectable()

export class LoginService {

  AUTH_SERVER : string = 'http://localhost:3000/api/users';
  authSubject = new BehaviorSubject(false);
  private token!: string;

  constructor(private httpClient:HttpClient) { }

  register (user : User): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}`,
     user).pipe(tap(
      (res:JwtResponseI)=>{
        if(res){
          // guardar token
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser.rol, res.dataUser.estado,  res.dataUser._id);
        }
      }
     ))
  }

  login (user : User): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
     user).pipe(tap(
      (res:JwtResponseI)=>{
        if(res){
          // guardar token
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser.rol, res.dataUser.estado, res.dataUser._id);
          this.saveUser(res.dataUser._id, res.dataUser);
        }
      }
     ))

  }

  logOut():void{
    this.token ='';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("ROL");
    localStorage.removeItem("User");
  }

  private saveToken(token:string, expiresIn : string, rol: string, estado: any, _id :any):void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("_id", _id);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    localStorage.setItem("ROL", rol);
    localStorage.setItem("STATE", estado);
    this.token = token;
  }

  saveUser(dataUser: any, user :any){
    localStorage.setItem("User", JSON.stringify(dataUser));
    localStorage.setItem("usuario", JSON.stringify(user));
  }

  getUser(): any{
    const _id = localStorage.getItem('_id')
    let a =  _id
    
    return a
  }
}
