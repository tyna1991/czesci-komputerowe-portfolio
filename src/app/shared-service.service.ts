    
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private currentCartCount = new BehaviorSubject(0);
  currentMessage = this.currentCartCount.asObservable();
  isLoggedIn = new Subject<boolean>();
  LoggedObservable = this.isLoggedIn.asObservable();

  constructor() {
   }
   updateCartCount(count: number) {
    this.currentCartCount.next(count)
  }
  checkIfIsLoggedIn(isLogged : boolean){
    this.isLoggedIn.next(isLogged);
  }
  
}