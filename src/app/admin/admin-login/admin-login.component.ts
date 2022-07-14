import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash, faExclamationTriangle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faExclamationTriangle = faExclamationTriangle;
  faEdit = faEdit;
  showPasswordIcon: boolean = true;
  hidePasswordIcon: boolean = false;
  loginForm: FormGroup;
  uuidValue: any;
  failedLogin;
  showFailed = false;
  registerNewLine: boolean = true;
  
showLoader = false;

  constructor(private route: Router, private userServ: UserService, private Uuid: UUIDService) { }

  ngOnInit(): void {
    this.uuidValue = this.Uuid.generateUUID();
    // console.log("this.uuidvalue");
    // console.log(this.uuidValue);
    this.loginForm = new FormGroup({
      "username": new FormControl(null,Validators.required),
      "password": new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }


     // login method start
     login(){
       this.showFailed = false;
      // console.log("user login type is ==== " + userType);
      
      
      console.log(this.loginForm.value);
    
 
      this.showLoader = true;
        // console.log("user is login random");
        this.userServ.AdminsignIn(this.loginForm.value).subscribe(
          (response:any)=>{
            this.showLoader = false;
            console.log("login response is");
            console.log(response);
            localStorage.setItem("auth",response.token);
            localStorage.setItem("sessionUserType",'admin');
           
            this.route.navigate(["dashboard/addProduct"]); 

            
            
        
            
            
          },
          err=>{
            this.showLoader = false;
            this.showFailed = true;
            this.failedLogin = err;
            console.log(err);
            
            
          }
        )
        
        
      
      
    }
  
    showPassword(id){
      document.getElementById(id).setAttribute("type","text");
      this.showPasswordIcon = false;
      this.hidePasswordIcon = true;
    }
    hidePassword(id){
      document.getElementById(id).setAttribute("type","password");
      this.showPasswordIcon = true;
      this.hidePasswordIcon = false;
    }
}


