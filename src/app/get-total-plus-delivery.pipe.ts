import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTotalPlusDelivery'
})
export class GetTotalPlusDeliveryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var total = 0;
    for (var i=0; i<value.orderItems.length; i++){
      total=total+value.orderItems[i].ilosc*value.orderItems[i].cena;
    }
    return total+value.DeliveryCost;
  }

}
