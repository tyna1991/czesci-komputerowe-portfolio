import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Produkt } from '../produkt.model';
import { ProduktServiceService } from '../produkt-service.service';
import { SharedService } from '../shared-service.service';
import {CartService} from './../cart.service';
import {Alert} from "./../alert";

@Component({
  selector: 'app-plyta-glowna',
  templateUrl: './plyta-glowna.component.html',
  styleUrls: ['./plyta-glowna.component.css']
})
export class PlytaGlownaComponent implements OnInit {

  statusCode: number;
  produkt: Produkt[];
  title:string = "Płyty główne";
  openModal:boolean=false;
  constructor(private productservice: ProduktServiceService, private sharedService:SharedService, public CartService: CartService) {
    
   }
   
getAllPlytyGlowne() {
  this.productservice.getPlytyGlowne()
.subscribe(
          data => {this.produkt = data
            this.productservice.searchForPromotion(data);},
          errorCode =>  this.statusCode = errorCode);   
}

  ngOnInit():void {
    this.getAllPlytyGlowne();
    console.log(this.produkt);
    
  }
  OnAddCart(produkt:Produkt){
  
    this.CartService.OnAddCart(produkt); 
    this.openModal=true;
}
hideModal(){
this.openModal=false;
}
}
