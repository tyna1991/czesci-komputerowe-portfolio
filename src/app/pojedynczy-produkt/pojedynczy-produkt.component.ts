import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProduktServiceService} from '../produkt-service.service';
import { Produkt } from "../produkt.model";
import { identity } from 'rxjs';
import{CartService} from './../cart.service'

@Component({
  selector: 'app-pojedynczy-produkt',
  templateUrl: './pojedynczy-produkt.component.html',
  styleUrls: ['./pojedynczy-produkt.component.css']
})
export class PojedynczyProduktComponent implements OnInit {
  ilosc:number=1;
  constructor(private route: ActivatedRoute, private ProduktService: ProduktServiceService, public CartService:CartService) {
 
   }
  product: Produkt;
  openModal:boolean=false;
  ileMagazyn:string;
  getQuantityWH(product:Produkt){
    console.log(product);
     if(product.iloscNaMagazynie<3){
       this.ileMagazyn="Mała ilość na magazynie"
     }
     if(product.iloscNaMagazynie>=3 && product.iloscNaMagazynie<=20){
       this.ileMagazyn="Średnia ilość na magazynie"
     }
     if(product.iloscNaMagazynie>20){
       this.ileMagazyn="Duża ilość na magazynie"
     }
     console.log(this.ileMagazyn);
  };
  getProduct(){
    const id = +this.route.snapshot.paramMap.get('id');
    const grupa = +this.route.snapshot.paramMap.get('grupa');
    var idString = id.toString();
    var grupaString = grupa.toString();
    console.log(grupa);
    this.ProduktService.getProduct(idString, grupaString).subscribe(data=> {this.product = data[0];
      console.log(this.product);
      this.getQuantityWH(this.product);
      this.ProduktService.searchForPromotionSingle(data[0]);
      // console.log(this.ProduktService.searchForPromotionSingle(data[0]))
    });
    
    
  }
  ngOnInit() {
    this.getProduct();
    console.log(this.product);
    
  }
 
  onAddQuantity(){
    console.log(this.ilosc);
    this.ilosc=this.ilosc+1;
  }   
  onRemoveQuantity(){
    if (this.ilosc>1){
      console.log(this.ilosc);
    this.ilosc=this.ilosc-1;
    }
    
  }
  OnAddCart(produkt:Produkt){
    produkt.ilosc=this.ilosc;
    this.CartService.OnAddCart(produkt);  
    this.openModal=true;
}
hideModal(){
  this.openModal=false;
}
}
