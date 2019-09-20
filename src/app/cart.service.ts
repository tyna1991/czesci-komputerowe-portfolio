import {
  Injectable
} from '@angular/core';
import {
  Produkt
} from './produkt.model';
import {
  ProduktServiceService
} from './produkt-service.service';
import {
  SharedService
} from './shared-service.service';
import {
  Alert
} from './alert';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  produkt: Produkt[];
  productAddedTocart: Produkt[];
  cartItemCount: number = 0;
  
  public alerts: Alert[];

  constructor(private productservice: ProduktServiceService, private sharedService: SharedService) {}
  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  OnAddCart(produkt: Produkt) {
    this.alerts = [];
    console.log(produkt);
    this.produkt = [];
    this.produkt[0] = produkt;
    this.productAddedTocart = this.productservice.getProductFromCart();
    if (this.productAddedTocart == null) {
      console.log("koszyk jest pusty");
    }
    if (this.productAddedTocart != null) {
      let tempProduct = this.productAddedTocart.find(p => p.id == produkt.id);
      if (tempProduct) {
        console.log("jest juz w koszyku");
        var index: number = this.productAddedTocart.findIndex(index => index.id === produkt.id);
        if (index !== -1) {
          this.productAddedTocart.splice(index, 1);
        }
        // this.productAddedTocart = this.productAddedTocart.filter(item => item.id !== produkt.id);
        //tempProduct.ilosc++;
        console.log(tempProduct.ilosc);
        tempProduct.ilosc = (tempProduct.ilosc) * 1 + (produkt.ilosc) * 1;

        console.log(produkt.ilosc);
        this.productAddedTocart.push(tempProduct);
        console.log(tempProduct);
        this.productservice.addProductToCart(this.productAddedTocart);
        this.alerts.push({
          id: 1,
          type: 'sucess',
          message: "Dodano do koszyka"
        });
      }
      else{
        this.productAddedTocart.push(produkt);
      console.log(this.productAddedTocart);
      this.productservice.addProductToCart(this.productAddedTocart);
      this.alerts.push({
        id: 1,
        type: 'sucess',
        message: "Dodano do koszyka"
      });
      this.cartItemCount = this.productAddedTocart.length;
        // this.cartEvent.emit(this.cartItemCount);
        this.sharedService.updateCartCount(this.cartItemCount);
      }
      
    }
       else {
        console.log("nie ma w koszyku");
        this.productAddedTocart=[];
        this.productAddedTocart.push(produkt);
        console.log(this.productAddedTocart);
        this.productservice.addProductToCart(this.productAddedTocart);
        this.alerts.push({
          id: 1,
          type: 'sucess',
          message: "Dodano do koszyka"
        });

        //     setTimeout(()=>{   
        //       this.closeAlert(this.alerts);
        //  }, 3000);
        this.cartItemCount = this.productAddedTocart.length;
        // this.cartEvent.emit(this.cartItemCount);
        this.sharedService.updateCartCount(this.cartItemCount);
      }

    }
  }
