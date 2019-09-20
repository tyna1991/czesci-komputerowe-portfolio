import { Component, OnInit } from '@angular/core';
import { Produkt } from '../produkt.model';
import { ProduktServiceService } from '../produkt-service.service';
import { SharedService } from '../shared-service.service';
import {CartService} from './../cart.service';
import {Alert} from "./../alert";


@Component({
  selector: 'app-dodatki',
  templateUrl: './dodatki.component.html',
  styleUrls: ['./dodatki.component.css']
})
export class DodatkiComponent implements OnInit {
  statusCode: number;
  produkt: Produkt[];
  title:string = "Akcesoria";
  productAddedTocart:Produkt[];
  cartItemCount: number = 0;
  public alerts = [];
  openModal:boolean=false;
  constructor(private productservice: ProduktServiceService, private sharedService:SharedService, public CartService: CartService) { }
  getAllDodatki() {
    this.productservice.getDodatki()
.subscribe(
            data => {this.produkt = data;
              this.productservice.searchForPromotion(data)},
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

// else
//               {
//                 let tempProduct=this.productAddedTocart.find(p=>p.id==produkt.id);
//                 if(tempProduct==null)
//                 {
//                   this.productAddedTocart.push(produkt);
//                   this.productservice.addProductToCart(this.productAddedTocart);
                  
//                 }

// }

}
