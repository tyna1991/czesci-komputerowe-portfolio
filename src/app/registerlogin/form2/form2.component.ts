import {Input, Component, OnInit, SimpleChanges, NgModule, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { User } from '../../user.model';
import {RegistrationService} from '../../registration.service'
import { AuthenticationService } from '../../authentication.service';
import { SharedService } from '../../shared-service.service';
import { Alert } from '../../alert';



@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css'],
  
  
})
@NgModule({
 
})
export class Form2Component implements OnInit {

  constructor(private sharedService:SharedService, private fb: FormBuilder,private regService:RegistrationService ,private authService:AuthenticationService, private router: Router) { }
  closeResult: string;
  registrationForm: FormGroup;
  loginForm:FormGroup;
  isLoggedIn:boolean=false;
  returnUrl:string;
 
  //@Input ('isLoggedin') isLoggedInParent:boolean=false;


  alerts:Alert[];
  public globalResponse: any;
  cartItemCount:number=0;
  approvalText:string="";
  currentUser: User[];
  // ngOnchanges(changes: SimpleChanges){
  //   if(changes['isLoggedInParent']){
  //     this.isLoggedIn=this.isLoggedInParent;
  //   }
  // }
  ngOnInit() {

    this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
    this.loginForm = this.fb.group({
      UserName:  ['', [Validators.required]],
      Password:['',[Validators.required]],
    });
    
  }
  
  Login()
  {
    let user=this.loginForm.value;
    this.isLoggedIn=false;
    this.authService.removeToken();
    this.alerts=[];
    //console.log(user);
        this.authService.ValidateUser(user)
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              console.log(error.message);
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: error.error.message,
              });
            },
            () => {
                //  This is Success part
               console.log(this.globalResponse);
               
                //this.authService.storeToken(this.globalResponse.access_token);  
                // this.alerts.push({
                //   id: 1,
                //   type: 'success',
                //   message: 'Zalogowany',
                // });
                this.isLoggedIn=true;
                this.sharedService.checkIfIsLoggedIn(this.isLoggedIn);
                this.router.navigate(["/"]);
                
                
                }
              )
            }
           
            
           
          
          }
          
