import { Component, OnInit } from '@angular/core';
import { Produkt } from '../produkt.model';
import { ProduktServiceService } from '../produkt-service.service';
import { SharedService } from '../shared-service.service';
import {CartService} from './../cart.service';
import {Alert} from "./../alert";

@Component({
  selector: 'app-dysk-twardy',
  templateUrl: './dysk-twardy.component.html',
  styleUrls: ['./dysk-twardy.component.css']
})
export class DyskTwardyComponent implements OnInit {

  statusCode: number;
  produkt: Produkt[];
  title:string = "Dyski twarde";
  public alerts = [];
  openModal:boolean=false;

  constructor(private productservice: ProduktServiceService, private sharedService:SharedService, public CartService: CartService) { }
  getAllDyskTwardy() {
    this.productservice.getDyskiTwarde()
.subscribe(
            data => {this.produkt = data;this.productservice.searchForPromotion(data)},
            errorCode =>  this.statusCode = errorCode);   
}
  ngOnInit() {
    this.getAllDyskTwardy();
  }
  OnAddCart(produkt:Produkt){
  
    this.CartService.OnAddCart(produkt); 
    this.openModal=true;
}
hideModal(){
this.openModal=false;
}
}
