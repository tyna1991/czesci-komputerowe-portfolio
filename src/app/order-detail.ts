
import { ProduktyZamowienie } from "./produkty-zamowienie";
export class OrderDetail {
  id:number;
  idClient:number;
    Name: string;
      Surname: string;
      DeliveryAddress:string;
      Delivery:string;
      Phone:string;
      Street:string;
      Code:string;
      City: string;
      PaymentMethods:string;
      DeliveryCost:number;
      dateTimeStamp:string;
      status: string;
      orderItems: ProduktyZamowienie[];
      

}
