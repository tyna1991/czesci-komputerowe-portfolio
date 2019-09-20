import {
  Component,
  OnInit
} from '@angular/core';
import {
  ProduktServiceService
} from '../produkt-service.service';
import {
  Produkt
} from '../produkt.model';
import {
  SharedService
} from '../shared-service.service';
import {
  Alert
} from "../alert";


@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {
  defQuantity: number = 1;
  productAddedTocart: Produkt[];
  allTotal: number;
  pusta: boolean = false;
  cartItemCount: number = 0;
  alertMagazyn: Alert[];
  oderLinkEnabled:boolean = false;

  constructor(private productservice: ProduktServiceService, private sharedService: SharedService) {}

  ngOnInit() {
    this.alertMagazyn=[];
    
    if (this.productservice.getProductFromCart() !== null) {
      this.oderLinkEnabled=true;
      this.productAddedTocart = this.productservice.getProductFromCart();
      for (let i in this.productAddedTocart) {
        if (this.productAddedTocart[i].ilosc == 0) {
          this.productAddedTocart[i].ilosc = 1;
        }
        if (this.productAddedTocart[i].iloscNaMagazynie < this.productAddedTocart[i].ilosc) {
          this.alertMagazyn = [];
          this.alertMagazyn.push({
            id: this.productAddedTocart[i].id,
            type: 'warning',
            message: "Podana ilość nie występuje na magazynie. Proces zamówienia może się wydłużyć."
          })
        }
      }

      if (this.productAddedTocart.length==0 || this.productAddedTocart == null || this.productAddedTocart == undefined) {
        this.pusta = true;
      };

    }
    if (this.productAddedTocart == null || this.productAddedTocart == undefined) {
      this.pusta = true;
    };


    this.productservice.removeAllProductFromCart();
    this.productservice.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
  }
  calculteAllTotal(allItems: Produkt[]) {
    let total = 0;
    for (let i in allItems) {
      total = total + (allItems[i].ilosc * allItems[i].cena);
    }
    this.allTotal = total;
  }


  onAddQuantity(product: Produkt) {
    //Get Product
    this.productAddedTocart = this.productservice.getProductFromCart();
    this.productAddedTocart.find(p => p.id == product.id).ilosc = product.ilosc * 1 + 1;

    console.log("dodaje jedynki");
    //Find produc for which we want to update the quantity
    //let tempProd= this.productAddedTocart.find(p=>p.Id==product.Id);  
    //tempProd.Quantity=tempProd.Quantity+1;

    //this.productAddedTocart=this.productAddedTocart.splice(this.productAddedTocart.indexOf(product), 1)
    //Push the product for cart
    // this.productAddedTocart.push(tempProd);
    this.productservice.removeAllProductFromCart();
    this.productservice.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
   
console.log(product.iloscNaMagazynie);
console.log(product.ilosc);
      if (product.iloscNaMagazynie < (product.ilosc*1+1)) {
        if (!this.alertMagazyn.some(e => e.id === product.id)){
          this.alertMagazyn.push({
            id: product.id,
            type: 'warning',
            message: "Podana ilość nie występuje na magazynie. Proces zamówienia może się wydłużyć."
          })
        }

        
      }
    

    //this.setValue(this.allTotal);

  }
  onRemoveQuantity(product: Produkt) {
    this.productAddedTocart = this.productservice.getProductFromCart();
    if (this.productAddedTocart.find(p => p.id == product.id).ilosc > 1) {
      this.productAddedTocart.find(p => p.id == product.id).ilosc = product.ilosc - 1;
    }

    this.productservice.removeAllProductFromCart();
    this.productservice.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
    //this.setValue(this.allTotal);
    if (this.productAddedTocart.length == 0) {
      this.pusta = true;
    };
    if (product.iloscNaMagazynie > product.ilosc - 2) {
      console.log(this.alertMagazyn.some(e => e.id === product.id));
     if (this.alertMagazyn.some(e => e.id === product.id)){
      var a = this.alertMagazyn.find(e => e.id === product.id); 
      const index: number = this.alertMagazyn.indexOf(a);
      if (index!== -1) {
        this.alertMagazyn.splice(index, 1);
    }  
     
    }

  }
}


  removeItem(product: Produkt) {
    this.productAddedTocart = this.productservice.getProductFromCart();

    var index: number = this.productAddedTocart.findIndex(index => index.id === product.id);
    this.productAddedTocart = this.productAddedTocart.filter(item => item.id !== product.id);


    this.productservice.removeAllProductFromCart();
    this.productservice.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
    if (this.productAddedTocart.length == 0) {
      this.pusta = true;
    };
    this.cartItemCount = this.productAddedTocart.length;
    this.sharedService.updateCartCount(this.cartItemCount);
    
  }


}