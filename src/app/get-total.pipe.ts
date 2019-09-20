import { Pipe, PipeTransform } from '@angular/core';
import {OrderDetail} from './order-detail';
import {Produkt} from './produkt.model'

@Pipe({
  name: 'getTotal'
})
export class GetTotalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    var total = 0;
    for (var i=0; i<value.length; i++){
      total=total+value[i].ilosc*value[i].cena;
    }
    return total;
    
  }

}
