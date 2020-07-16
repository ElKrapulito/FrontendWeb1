import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { User } from '../interfaces/user';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRouteSnapshot
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
    return this.http.post<any>(this.urlLogin,user)
      .pipe(
        tap(()=> {}),
        catchError(this.handleError<any>('LogIn'))
      );
  }

  decode(token:string){
    const result = jwt_decode(token);
    return result;
  }

  registerUser(user:User){
    return this.http.post<any>(this.url,user, this.httpOptions).pipe(
      tap((user: User) => console.log(`added user w/ id=${user.id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      alert('usuario o contraseña equivocados!')
      return of(result as T);
    };
  }
}
