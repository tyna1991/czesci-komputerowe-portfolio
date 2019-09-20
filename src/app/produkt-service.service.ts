import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Produkt} from "./produkt.model";
import { Observable, of, Subject } from 'rxjs';
//import { AuthenticationService } from './authentication.service';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProduktServiceService {

  readonly DB_URL="https://api.mlab.com/api/1/databases/sklep/collections/produkty?q=";
  readonly param =  new HttpParams().set('apiKey','J_RsTWrqwBTgb-LycCIkW3o0edzi8av-');
  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Produkt[]> {
    return this.http.get<Produkt[]>("https://api.mlab.com/api/1/databases/sklep/collections/produkty}", {params:this.param});
}
getProcesory(): Observable<Produkt[]> {
  return this.http.get<Produkt[]>("https://api.mlab.com/api/1/databases/sklep/collections/produkty?q={%22grupa%22%20:%20%221%22}", {params:this.param});
}
getKartyGraficzne(): Observable<Produkt[]> {
  return this.http.get<Produkt[]>("https://api.mlab.com/api/1/databases/sklep/collections/produkty?q={%22grupa%22%20:%20%222%22}", {params:this.param});
}
getPamiec(): Observable<Produkt[]> {
  return this.http.get<Produkt[]>("https://api.mlab.com/api/1/databases/sklep/collections/produkty?q={%22grupa%22%20:%20%223%22}", {params:this.param});
}
getDyskiTwarde(): Observable<Produkt[]> {
  return this.http.get<Produkt[]>("https://api.mlab.com/api/1/databases/sklep/collections/produkty?q={%22grupa%22%20:%20%224%22}", {params:this.param});
}
getPlytyGlowne(): Observable<Produkt[]> {
  return this.http.get<Produkt[]>("https://api.mlab.com/api/1/databases/sklep/collections/produkty?q={%22grupa%22%20:%20%225%22}", {params:this.param});
}
getObudowy(): Observable<Produkt[]> {
  return this.http.get<Produkt[]>("https://api.mlab.com/api/1/databases/sklep/collections/produkty?q={%22grupa%22%20:%20%226%22}", {params:this.param});
}
getZasilacz(): Observable<Produkt[]> {
  return this.http.get<Produkt[]>("https://api.mlab.com/api/1/databases/sklep/collections/produkty?q={%22grupa%22%20:%20%227%22}", {params:this.param});
}
getDodatki(): Observable<Produkt[]> {
  return this.http.get<Produkt[]>("https://api.mlab.com/api/1/databases/sklep/collections/produkty?q={%22grupa%22%20:%20%228%22}", {params:this.param});
}

getProduct(id:string, kat:string):Observable<Produkt>{
  //const params = new HttpParams().set('id',encodeURIComponent(JSON.stringify(id))).set('k',encodeURIComponent(JSON.stringify(kat)));
  let param = JSON.stringify({
    ["id"]: id,
    ["grupa"]: kat,
  });
  //let data = {id: id, k:kat};
 // console.log(params);
 return this.http.get<Produkt>('https://api.mlab.com/api/1/databases/sklep/collections/produkty?q='+param, {params:this.param});
}
 getProductsRecommended(): Observable<Produkt[]> {
    return this.http.get<Produkt[]>("https://api.mlab.com/api/1/databases/sklep/collections/produkty?q={%22HomePage%22%20:%20%221%22}", {params:this.param});
}
async getProductById(id:string):Promise<string>{
  //const params = new HttpParams().set('id',id);
  let param = JSON.stringify({
    ["id"]: id,
  });
  var response = await this.http.get<Produkt>('https://api.mlab.com/api/1/databases/sklep/collections/produkty?q='+param, {params:this.param}).toPromise();
 return response[0].thumbnail;
}

getProductFromCart(){
  if (localStorage.getItem("product") == "undefined") {
    console.log("null");
    return [];
  }
  else{
    console.log(localStorage.getItem('product'));
      return JSON.parse(localStorage.getItem('product'));
    
  }
  
}
addProductToCart(products: any) {
  localStorage.setItem("product", JSON.stringify(products));
  
}

 removeAllProductFromCart() {
   return localStorage.removeItem("product");
 }
 searchForPromotion(data: Produkt[]) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].cenaPromocyjna > 0) {
        data[i].promo=true;
    }
  }
}
searchForPromotionSingle(data:Produkt){
  if (data.cenaPromocyjna > 0) {
      data.promo=true;
  }
}
getSearchedProducts(value:any){
  let param = JSON.stringify({
    ["nazwa"]: value,
  });
  return this.http.get<Produkt[]>('https://api.mlab.com/api/1/databases/sklep/collections/produkty?q='+param, {params:this.param});
}
}


