import {
  Component,
  OnInit
} from '@angular/core';
import {
  ProduktServiceService
} from "../produkt-service.service";
import {
  Produkt
} from "../produkt.model";

@Component({
  selector: 'app-strona-glowna',
  templateUrl: './strona-glowna.component.html',
  styleUrls: ['./strona-glowna.component.css']
})
export class StronaGlownaComponent implements OnInit {

  constructor(private productService: ProduktServiceService) {}
  productsRecommended: Produkt[];
  promotion: boolean;
  ngOnInit() {
    this.productService.getProductsRecommended().subscribe(data => {
      this.productsRecommended = data;
      this.productService.searchForPromotion(data);
    })
  }
 

  }
