import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  constructor(private _http: HttpClient) { }

  // Url to fetch all the existing users from the database
  getUsersApi = 'http://localhost:3000/get_users';
  
  getUsers(): Observable<any>{
    return this._http.get(`${this.getUsersApi}`)
  }

  // Url to send the data of user to backend 
  createUserApi = 'http://localhost:3000/create_user';

  createUsers(data: any): Observable<any>{
    return this._http.post(`${this.createUserApi}`, data,  {responseType: 'text'})
  }
}
