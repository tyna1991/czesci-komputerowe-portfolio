import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ProduktServiceService
} from "../produkt-service.service";
import {
  Produkt
} from "../produkt.model";
import { ActivatedRoute, Route } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  navigationSubscription;  
  loadSearchResult(){
    
    const value = this.route.snapshot.paramMap.get('value');
    this.searchProduct=[];
    this.productService.getSearchedProducts(value).subscribe(data => {
    this.searchProduct = data;
    if(this.searchProduct.length==0){
      this.isEmpty=true;
    }
    else this.isEmpty=false;
    this.productService.searchForPromotion(data);
  })
  }
  constructor(private productService: ProduktServiceService, private route: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
   }
  searchProduct: Produkt[];
  isEmpty:boolean;
  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.loadSearchResult();
  }
 
  ngOnInit() {
    this.loadSearchResult();
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
