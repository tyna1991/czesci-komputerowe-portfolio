import { Component, OnInit } from '@angular/core';
import { Produkt } from '../produkt.model';
import { ProduktServiceService } from '../produkt-service.service';
import { SharedService } from '../shared-service.service';
import {CartService} from './../cart.service';
import {Alert} from "./../alert";

@Component({
  selector: 'app-karta-graficzna',
  templateUrl: './karta-graficzna.component.html',
  styleUrls: ['./karta-graficzna.component.css']
})
export class KartaGraficznaComponent implements OnInit {

  statusCode: number;
  produkt: Produkt[];
  title:string = "Karty Graficzne";
  openModal:boolean=false;

  constructor(private productservice: ProduktServiceService, private sharedService:SharedService, public CartService: CartService) { }
  getAllKartaGraficzna() {
    this.productservice.getKartyGraficzne()
.subscribe(
            data =>{ this.produkt = data;this.produkt = data;this.productservice.searchForPromotion(data)},
            errorCode =>  this.statusCode = errorCode);   
}
  ngOnInit() {
    this.getAllKartaGraficzna();
  }
  OnAddCart(produkt:Produkt){
  
    this.CartService.OnAddCart(produkt); 
    this.openModal=true;
}
hideModal(){
this.openModal=false;
}
}
