import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  urlLogin = `${environment.apiUrl}/auth/login`;
  url = `${environment.apiUrl}/user`;

  logIn(user){
    return this.http.post<any>(this.urlLogin,user);
  }

  decode(token:string){
    const result = jwt_decode(token);
    return result;
  }

}
