import { Component , ElementRef , HostListener, Output } from '@angular/core';
import { SharedService } from './shared-service.service';
import { ProduktServiceService } from './produkt-service.service';
import { Produkt } from './produkt.model';
import { User } from './User.Model';
import { AuthenticationService} from '../app/authentication.service';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import{Form2Component} from '/Users/Justyna S/czesci-komputerowe/src/app/registerlogin/form2/form2.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'czesci-komputerowe';
  status:boolean = false;
  ileKoszyk : number;
  productAddedTocart:Produkt[];
  cartItemCount: number = 0;
  showNumber:boolean = true;
  currentUser: User;
  isLoggedIn:boolean;
  
  constructor(private sharedService:SharedService, private productservice: ProduktServiceService, private authService: AuthenticationService, private router: Router) {

      this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
      
      
   }
   searchValue:string;
  searchProduct(value:any){

    this.router.navigate(['search', value]);
    this.searchValue='';
     
  }
 logOut()
            {

              this.isLoggedIn=false;
              this.sharedService.checkIfIsLoggedIn(this.isLoggedIn);
              //this.authService.removeToken();
              this.authService.removeCurrentUser();
            }

  openSidenav(){
    this.status=!this.status;
  }
  closeSidenav(){
    this.status=!this.status;
  }
  
  ngOnInit(){
    this.sharedService.currentMessage.subscribe(msg => this.ileKoszyk = msg);
    if(this.productservice.getProductFromCart()!==null){
      this.productAddedTocart=this.productservice.getProductFromCart();
      this.cartItemCount=this.productAddedTocart.length;
      this.sharedService.updateCartCount(this.cartItemCount);
    }
    console.log(this.currentUser);
    
    this.sharedService.LoggedObservable.subscribe((msg => this.isLoggedIn = msg));
    console.log(this.isLoggedIn);
    if(this.currentUser!==null){
      this.sharedService.checkIfIsLoggedIn(true);
    }

    
    
  }
}
