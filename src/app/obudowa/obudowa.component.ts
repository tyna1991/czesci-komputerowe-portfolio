import { Component, OnInit } from '@angular/core';
import { Produkt } from '../produkt.model';
import { ProduktServiceService } from '../produkt-service.service';
import { SharedService } from '../shared-service.service';
import {CartService} from './../cart.service';
import {Alert} from "./../alert";

@Component({
  selector: 'app-obudowa',
  templateUrl: './obudowa.component.html',
  styleUrls: ['./obudowa.component.css']
})
export class ObudowaComponent implements OnInit {

  statusCode: number;
  produkt: Produkt[];
  title:string = "Obudowy";
  openModal:boolean=false;
  constructor(private productservice: ProduktServiceService, private sharedService:SharedService, public CartService: CartService) { }
  getAllDodatki() {
    this.productservice.getObudowy()
.subscribe(
            data =>{ this.produkt = data;
              this.produkt = data;this.productservice.searchForPromotion(data)},
            errorCode =>  this.statusCode = errorCode);   
}
  ngOnInit() {
    this.getAllDodatki();
  }
  OnAddCart(produkt:Produkt){
  
    this.CartService.OnAddCart(produkt); 
    this.openModal=true;
}
hideModal(){
this.openModal=false;
}

}
