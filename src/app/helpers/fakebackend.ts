import { Component, OnInit, Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { HttpClient,HttpClientModule } from '@angular/common/http';



@Injectable()
export class FakeBackend implements HttpInterceptor {
 // constructor(private httpClient:HttpClient) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //zarejestrowani userzy
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
  // return of(null).pipe(mergeMap(() => {
      if (request.url.endsWith('/authenticate') && request.method === 'POST') {
          // find if any user matches login credentials
          let filteredUsers = users.filter(user => {
              return user.UserName === request.body.UserName && user.Password === request.body.Password;
          });

          if (filteredUsers.length) {
              // if login details are valid return 200 OK with user details and fake jwt token
              let user = filteredUsers[0];
              let body = {
                  id: user.id,
                  UserName: user.UserName,
                  token: user.token='fake-token'
              };
              return of(new HttpResponse({ status: 200, body: body }));
          } else {
              // else return 400 bad request
              return throwError({ error: { message: 'Login lub hasło są niepoprawne' } });
          }
      }
       // rejestracja
       else if (request.url.endsWith('/register') && request.method === 'POST') {
        // get new user object from post body
        let newUser = request.body;
        console.log(newUser.UserName);
        console.log("nowy user: "+newUser);
        // validation
        let duplicateUser = users.filter(user => { return user.UserName === newUser.UserName; }).length;
        if (duplicateUser) {
            return throwError({ error: { message: 'Login "' + newUser.UserName + '" jest już zajęty' }});
        }

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
    }
   
 // }))
 
  return next.handle(request);
}

}

// export let fakeBackendProvider = {
//   // use fake backend in place of Http service for backend-less development
//   provide: HTTP_INTERCEPTORS,
//   useClass: FakeBackendComponent,
//   multi: true}
