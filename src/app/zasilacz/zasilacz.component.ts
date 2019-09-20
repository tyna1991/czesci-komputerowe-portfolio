import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Produkt } from '../produkt.model';
import { ProduktServiceService } from '../produkt-service.service';
import { SharedService } from '../shared-service.service';
import {CartService} from './../cart.service';
import {Alert} from "./../alert";

@Component({
  selector: 'app-zasilacz',
  templateUrl: './zasilacz.component.html',
  styleUrls: ['./zasilacz.component.css']
})
export class ZasilaczComponent implements OnInit {

  statusCode: number;
  produkt: Produkt[];
  title:string = "Zasilacze";
  openModal:boolean=false;
  constructor(private productservice: ProduktServiceService, private sharedService:SharedService, public CartService: CartService) {
    
   }

getAllZasilacze() {
  this.productservice.getZasilacz()
.subscribe(
          data => {this.produkt = data;
            this.productservice.searchForPromotion(data)},
          errorCode =>  this.statusCode = errorCode);   
}

  ngOnInit():void {
    this.getAllZasilacze();
    

}
OnAddCart(produkt:Produkt){
  
  this.CartService.OnAddCart(produkt); 
  this.openModal=true;
}
hideModal(){
this.openModal=false;
}
}
