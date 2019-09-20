import {Input, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { User } from '../../user.model';
import {RegistrationService} from '../../registration.service'
import { AuthenticationService } from '../../authentication.service';
import { SharedService } from '../../shared-service.service';
import { Alert } from '../../alert';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'form1',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers:[RegistrationService]
})
export class FormComponent implements OnInit {
  closeResult: string;
  registrationForm: FormGroup;
  loginForm:FormGroup;
  registrationInputs: User[];
  currentUser: User[];
  isLoggedIn:boolean=false;
  openModal:boolean=false;
  cartItemCount:number=0;
  approvalText:string="";
  alerts=[];
  alertsDanger = [];

  @Input()
  //public alerts: Array<IAlert> = [];


  public globalResponse: any;
  submitted = false;

  constructor(private sharedService:SharedService, private fb: FormBuilder,private regService:RegistrationService ,private authService:AuthenticationService, private router: Router) {

  }
  ngOnInit()
  {
    this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
    this.registrationForm = this.fb.group({
      UserName:  ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Password:['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Email:['',Validators.compose([Validators.required,Validators.email])],
      id:['']
    });
    
  }

  // open(content) {
  //   //this.alerts=[];
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }
  
  OnRegister()
  {
    this.submitted=true;
    if (this.registrationForm.invalid){
      console.log(this.submitted);
      return;
    }else{
      this.registrationInputs=this.registrationForm.value;
    
      //console.log(this.registrationInputs);
          this.regService.RegisterUser(this.registrationInputs)
              .subscribe((result) => {
                this.globalResponse = result;              
              },
              error => { //This is error part
                this.alertsDanger.push({
                  id: 2,
                  type: 'danger',
                  message: 'Rejestracja nie powiodła się. '+error.error.message,
                });
              },
              () => {
                  //  This is Success part
                  this.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Rejestracja zakończona sukcesem',
                  });
                  this.openModal=true;
                  this.alertsDanger=[];
                  }
                )
    }
   
            }
            hideModal(){
              this.openModal=false;
              }
  } 
 
 
 



