import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { Response } from '../models/response';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  logged=new Subject<boolean>();
  logstatus:boolean


  constructor(private _apiService:ApiService) {
    this.getLoggedStatus().subscribe(status =>{
        this.logstatus = status
    })
    this.logged.next(this.logstatus);
   }

  login(token:string){
    localStorage.setItem('token',token);
    this.setLoggedStatus(true);
  }

  loginUser(body:any){
    return this._apiService.login("auth/signin",body)
  }

  logout(){
    localStorage.removeItem('token');
    this.setLoggedStatus(false);
  }

  setLoggedStatus(status:boolean)
  {
    console.log("setLoggedStatus"+status)
    this.logged.next(status);
  }

  getToken():any{
    // this._apiService.verifyToken("auth/signin").subscribe(response => {
    //   let ResponseApi = response as Response;
    //   if(ResponseApi.Success) return localStorage.getItem('token')
    //   else return false
    // })
    return localStorage.getItem('token')
  }

  getLoggedStatus():Observable<any>{
    return this.logged.asObservable();
  }
  
  getAllUser(){
    return this._apiService.get("user")
  }

  createUser(body:any){
    return this._apiService.post("auth/signup",body)
  }

  getUserById(id:number){
    return this._apiService.getByID("user",id)
  }

  deleteUser(id:number){
    return this._apiService.delete("user",id)
  }

  updateUser(id:number,body:any){
    return this._apiService.put("user",id,body)
  }
}
