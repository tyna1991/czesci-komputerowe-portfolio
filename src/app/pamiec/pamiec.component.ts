import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Produkt } from '../produkt.model';
import { ProduktServiceService } from '../produkt-service.service';
import { SharedService } from '../shared-service.service';
import {CartService} from './../cart.service';
import {Alert} from "./../alert";

@Component({
  selector: 'app-pamiec',
  templateUrl: './pamiec.component.html',
  styleUrls: ['./pamiec.component.css']
})
export class PamiecComponent implements OnInit {

  wszystkieProdukty:Produkt[];
  statusCode: number;
  produkt: Produkt[];
  title:string = "Pamięć";
  openModal:boolean=false;
  
  constructor(private productservice: ProduktServiceService, private sharedService:SharedService, public CartService: CartService) {
    
   }
   
getAllPamiec() {
  this.productservice.getPamiec()
.subscribe(
          data => {this.produkt = data;
            this.productservice.searchForPromotion(data)},
          errorCode =>  this.statusCode = errorCode);   
}

  ngOnInit():void {
    this.getAllPamiec();
  }
  OnAddCart(produkt:Produkt){
  
    this.CartService.OnAddCart(produkt); 
    this.openModal=true;
}
hideModal(){
this.openModal=false;
}
}
