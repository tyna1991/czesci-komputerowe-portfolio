import {
  Component,
  OnInit
} from '@angular/core';
import {
  OrderService
} from '../order.service';
import {
  OrderDetail
} from '../order-detail';
import {
  Produkt
} from "../produkt.model";
import {
  User
} from "../user.model";
import {
  ProduktServiceService
} from "../produkt-service.service"
import { ProduktyZamowienie } from '../produkty-zamowienie';
@Component({
  selector: 'app-zamowienia',
  templateUrl: './zamowienia.component.html',
  styleUrls: ['./zamowienia.component.css']
})
export class ZamowieniaComponent implements OnInit {

  constructor(private order: OrderService, private productService: ProduktServiceService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    
    this.id = this.currentUser['id'];
    console.log(this.id);
    this.order.getOrderbyId(this.id).subscribe(data => {
      console.log(data);
      this.yourOrders = data;
      if (data.length==0){
        this.pusta=true;
      }else this.pusta=false;
      //this.getInfoOfProductThumbnail(data[0].orderItems);
    })
    
  }
  pusta:Boolean;
  id: string;
  idSingle: string;
  currentUser: User[];
  allTotal:number;
  

  yourOrders: OrderDetail[];

  // get sortData() {
  //   return this.yourOrders.sort((a, b) => {
  //     return <any>new Date(a.dateTimeStamp) - <any>new Date(b.dateTimeStamp);
  //   });
  // }
  // getInfoOfProductThumbnail(product: ProduktyZamowienie[]) {
  //     this.idSingle = product.id.toString();
  //     this.productService.getProductById(this.idSingle).subscribe(data => {
  //       console.log(data.thumbnail);
  //       return data.thumbnail;})
  // }
  // calculteAllTotal(allItems: OrderDetail) {
  //   var allProducts = allItems.orderItems;
  //   let total = 0;
  //   for (let i in allProducts) {
  //     total = total + (allProducts[i].ilosc * allProducts[i].cena);
  //   }
  //   this.allTotal = total;
  // }

}