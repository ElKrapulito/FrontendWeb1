import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { User } from '../interfaces/user';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  urlLogin = `${environment.apiUrl}/auth/login`;
  url = `${environment.apiUrl}/user`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'observe': 'body',
      'responseType': 'json'
    })
  };

  logIn(user){
    return this.http.post<any>(this.urlLogin,user);
  }

  decode(token:string){
    const result = jwt_decode(token);
    return result;
  }

  registerUser(user:User){
    return this.http.post<any>(this.url,user, this.httpOptions).pipe(
      tap((newHero: User) => console.log(`added user w/ id=${newHero.id}`))
    );
  }

}
