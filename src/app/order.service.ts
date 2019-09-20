import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Http, Response } from '@angular/http';  
import {AuthenticationService} from './authentication.service';
import {OrderDetail} from './order-detail';
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {SharedService} from './shared-service.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public apiURL:string="https://api.mlab.com/api/1/databases/sklep/collections/order";
  readonly param =  new HttpParams().set('apiKey','J_RsTWrqwBTgb-LycCIkW3o0edzi8av-');
  constructor(private httpClient:HttpClient, private authService:AuthenticationService, private sharedService: SharedService ) { }

  allOrders():Observable<OrderDetail[]>{
    return this.httpClient.get<OrderDetail[]>("https://api.mlab.com/api/1/databases/sklep/collections/order?", {params:this.param});
  }
  PlaceOrder (orderDetail:OrderDetail)
  {
    var reqHeader = new HttpHeaders({ 'Authorization':'Bearer '+this.authService.getToken()});
        reqHeader.append('Content-Type', 'application/json');
        const options = { params: this.param, headers: reqHeader };
    return this.httpClient.post(this.apiURL,orderDetail,options)
    .pipe(
      map(res => {
        localStorage.removeItem("product");
        this.sharedService.updateCartCount(0);
        return res;
      }),
       catchError( this.errorHandler)
      );
      
  }

  getOrderbyId(id:string):Observable<OrderDetail[]>{
    const params = new HttpParams().set('idClient',id);
    console.log(params);
    let param = JSON.stringify({
      ["idClient"]: id,
    });
    return this.httpClient.get<OrderDetail[]>("https://api.mlab.com/api/1/databases/sklep/collections/order?q="+param, {params:this.param});
  }
 
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}
