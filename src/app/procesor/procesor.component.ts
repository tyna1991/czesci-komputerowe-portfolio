import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Produkt } from '../produkt.model';
import { ProduktServiceService } from '../produkt-service.service';
import { SharedService } from '../shared-service.service';
import {CartService} from './../cart.service';
import {Alert} from "./../alert";


@Component({
  selector: 'app-procesor',
  templateUrl: './procesor.component.html',
  styleUrls: ['./procesor.component.css']
})
export class ProcesorComponent implements OnInit {
  statusCode: number;
  produkt: Produkt[];
  title:string = "Procesory";
  openModal:boolean=false;
  constructor(private productservice: ProduktServiceService, private sharedService:SharedService, public CartService: CartService) {
    
   }
   
getAllProcesory() {
  this.productservice.getProcesory()
.subscribe(
          data => {this.produkt = data;
            this.productservice.searchForPromotion(data)},
          errorCode =>  this.statusCode = errorCode);   
}

  ngOnInit():void {
    this.getAllProcesory();
    
    //const header = new HttpHeaders({'Content-Type':'application/json'});
     //header.set("x-apikey", "030023e3451c9727cb0b96a0a1cbf1128fac1").set('cache-control', 'no-cache').set('Access-Control-Allow-Origin','*');
      
      //  this.http.get('http://localhost:3000/produkty', {headers:header}).subscribe(data => {
      //      console.log(data)});
    
    //  const header = new HttpHeaders({'Content-Type':'application/json'});
    //  header.set("x-apikey", "030023e3451c9727cb0b96a0a1cbf1128fac1").set('cache-control', 'no-cache').set('Access-Control-Allow-Origin','*');
    //  console.log("tutaj");
    //  this.http.get('https://projektsklep-56e8.restdb.io/rest/sklep', {headers:header}).subscribe(data => {
    //    console.log(data);
      
    //  })
    
  //       (err: HttpErrorResponse) => {
  //           if (err.error instanceof Error) {
  //               console.log('Client-side error occured.');
  //           } else {
  //               console.log('Server-side error occured.');
  //           }
  //       }


   
  
    }
    OnAddCart(produkt:Produkt){
  
      this.CartService.OnAddCart(produkt); 
      this.openModal=true;
}
hideModal(){
this.openModal=false;
}
  }