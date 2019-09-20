import { Pipe, PipeTransform } from '@angular/core';
import {Produkt} from './produkt.model';
import{ProduktServiceService} from './produkt-service.service'
import { map } from 'rxjs/operators';

@Pipe({
  name: 'getThumbnail'
})
export class GetThumbnailPipe implements PipeTransform {
  constructor(private productService: ProduktServiceService) {

  }
  thumbnail:string;
  transform(value: Produkt): any {
    var idSingle = value.id.toString();
    // this.productService.getProductById(idSingle).subscribe(data => {
          
    //        this.thumbnail=data[0].thumbnail;
    // });
    //       console.log(this.thumbnail);
         
    //        this.productService.getProductById(idSingle).pipe(map(
    //         data => {
    //           this.thumbnail=data[0].thumbnail;}
    //        ));
    
           return this.productService.getProductById(idSingle);
           
          //  .pipe(map(
          //   data => {
          //     data=data[0].thumbnail;}
           //));
        
     }
    
   // return null;

  }


