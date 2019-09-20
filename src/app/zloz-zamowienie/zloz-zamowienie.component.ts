import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Zamowienie } from '../zamowienie';
import {User} from "../user.model";
import {ProduktServiceService} from '../produkt-service.service';
import {Produkt} from '../produkt.model';
import{ProduktyZamowienie} from "../produkty-zamowienie";
import{OrderService} from "../order.service";
import {Alert} from "../alert";
import { OrderDetail } from '../order-detail';


@Component({
  selector: 'app-zloz-zamowienie',
  templateUrl: './zloz-zamowienie.component.html',
  styleUrls: ['./zloz-zamowienie.component.css']
})
export class ZlozZamowienieComponent implements OnInit {
  deliveryForm:FormGroup;
  constructor(private fb: FormBuilder, private productService: ProduktServiceService, private orderService:OrderService) {this.currentUser=JSON.parse(localStorage.getItem('currentUser')); }
  orderInputs: Zamowienie[];
  currentUser:User[];
  productAddedTocart:Produkt[];
  orderItem:ProduktyZamowienie[];
  alerts:Alert[];
  orders:OrderDetail[];
  public globalResponse: any;
  allTotal: number;
  deliveryOptions=["odbiór osobisty", "kurier"];
  deliveryOption:string;
  selectedValue:string;
  selectedValue2:string;
  deliveryCost:number;
  paymentOptions=[];
  allCost:number;
  openModal:boolean=false;
  submitted=false;

  ngOnInit() {
    this.deliveryForm = this.fb.group({
      Name:  ['', [Validators.required]],
      Surname:  ['', [Validators.required]],
      // DeliveryAddress:['',[Validators.required]],
      Street:['',[Validators.required]],
      Code:['',[Validators.required]],
      City:['',[Validators.required]],
      Phone:['',[Validators.required]],
      Delivery:["odbiór osobisty",[Validators.required]],
      PaymentMethods:['-',[Validators.required]], 
  })
  
  this.productAddedTocart=this.productService.getProductFromCart();
  this.calculteAllTotal(this.productAddedTocart);
  this.orderService.allOrders().subscribe(
    data => this.orders = data
    )
}
ConfirmOrder(){
  this.submitted=true;
  if (this.deliveryForm.invalid){
    return;
  }else{
    const date: Date = new Date();
  var idClient=this.currentUser['id'];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var minutes = date.getMinutes();
  var hours = date.getHours();
  var seconds = date.getSeconds();
  var dateTimeStamp=day.toString()+"-"+monthIndex.toString()+"-"+year.toString()+" "+hours.toString()+":"+minutes.toString()+":"+seconds.toString();
  let orderDetail:any={};
  this.alerts=[];

  this.orderInputs=this.deliveryForm.value;
  console.log(this.orderInputs);
  orderDetail=this.orderInputs;
 

  orderDetail.idClient=idClient;
  orderDetail.dateTimeStamp=dateTimeStamp;
  
  orderDetail.id=this.orders.length;
  orderDetail.status="Złożono zamówienie";
  
  this.orderItem=[];
    for (let i in this.productAddedTocart) {
      this.orderItem.push({
        idZamowienia:this.orders.length,
        id:this.productAddedTocart[i].id,
        nazwa:this.productAddedTocart[i].nazwa,
        ilosc:this.productAddedTocart[i].ilosc,
        cena:this.productAddedTocart[i].cena,
      }) ;
   }
   orderDetail.orderItems=this.orderItem;
  orderDetail.DeliveryCost = this.deliveryCost;
   
   
    
   
   this.orderService.PlaceOrder(orderDetail)
   .subscribe((result) => {
     this.globalResponse = result;   
     console.log(result);           
   },
   error => { //This is error part
     console.log(error.message);
     this.alerts.push({
       id: 2,
       type: 'danger',
       message: 'Coś poszło nie tak'
     });
   },
   () => {
       //  This is Success part
       //console.log(this.globalResponse);
       this.alerts.push({
         id: 1,
         type: 'success',
         message: 'Pomyślnie złożono zamówienie',
       });
       this.openModal=true;
       
       }
     )

  }
  
}
calculteAllTotal(allItems: Produkt[]) {
  let total = 0;
  for (let i in allItems) {
    total = total + (allItems[i].ilosc * allItems[i].cena);
  }
  this.allTotal = total;
}
selectChange( $event){
  this.deliveryOption=$event;
  this.selectedValue="odbiór osobisty";
  if(this.deliveryOption=="kurier"){
    this.paymentOptions=["przedpłata", "pobranie"];
    this.selectedValue2="przedpłata";
    this.deliveryCost=15;
  }

  if(this.deliveryOption=="odbiór osobisty"){
    this.paymentOptions=["przedpłata", "płatność przy odbiorze"];
    this.selectedValue2="przedpłata";
    this.deliveryCost=0;
  }
  this.allCost=this.allTotal+this.deliveryCost;
}
selectChange2( $event){
  if(this.selectedValue=="kurier"){
    if($event=="przedpłata"){
      this.deliveryCost=15;
    }
    if($event=="pobranie"){
      this.deliveryCost=20;
    }
  }
  else{
    this.deliveryCost=0;
  }
 

  this.allCost=this.allTotal+this.deliveryCost;
  
};

  }

  

