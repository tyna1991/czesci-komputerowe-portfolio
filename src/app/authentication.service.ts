import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';  
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public apiURL:string="https://api.mlab.com/api/1/databases/sklep/collections/authenticate";
currentUser:User;
  constructor(private httpClient:HttpClient) {this.currentUser=JSON.parse(localStorage.getItem('currentUser'));console.log(this.currentUser); }
  
  ValidateUser (user:any)
  {
    //var userData = "username=" + user.UserName + "&password=" + user.Password + "&grant_type=password";

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','No-Auth':'True' });

    return this.httpClient.post(this.apiURL,user)
    .pipe(
      map(res => {
        console.log(res);
        //if (user && user.token) {
          // store user details and token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(res));
          return res;
      //}

      }),
       catchError( this.errorHandler)
      );
  }
  getClaims ()
  {
    var reqHeader = new HttpHeaders({ 'Authorization':'Bearer '+this.getToken()});
        reqHeader.append('Content-Type', 'application/json');
    return this.httpClient.get(this.apiURL+ 'Users',{ headers: reqHeader })
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
   public isAuthenticated(): boolean {
     return this.getToken() !== null;
   }
  storeToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    return this.currentUser.token;
  }
  removeToken() {
    return localStorage.removeItem("token");
  }
removeCurrentUser(){
  return localStorage.removeItem("currentUser");
}

  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 




}