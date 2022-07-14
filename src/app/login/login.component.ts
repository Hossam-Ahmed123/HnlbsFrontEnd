import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { faEye, faEyeSlash, faExclamationTriangle, faEdit, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { UUIDService } from '../services/uuid.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faEye = faEye;
  showLoader = false;
  faExclamationCircle = faExclamationCircle;
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
  sessionUserStatus;
  activeTabType = "client";
  checkMailMessage = false;
  allOfflineCartItems: any;
  cartedObject = {};
  constructor(private route: Router, private userServ: UserService, private Uuid: UUIDService, private activRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log("-----------------------------");


    this.uuidValue = this.Uuid.generateUUID();
    this.loginForm = new FormGroup({
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  // login method start
  login() {
    console.log(this.loginForm.value);

    // this.checkMailMessage = false;
    // this.showFailed = false;
    // this.showLoader = true;
    // localStorage.setItem("auth", response.data.token);
    // this.getUserData(response.data.profileId);


    // localStorage.setItem("email", response.data.email);

    this.userServ.signIn(this.loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.showLoader = false;
        console.log("login method 111111");
       
        localStorage.setItem("token", response.token);
        this.route.navigate(["/landingInner"]);
        this.getUserDataLast()




        this.allOfflineCartItems = JSON.parse(localStorage.getItem('products'));
        setTimeout(() => {
          if (this.allOfflineCartItems.length != 0) {


            for (const items of this.allOfflineCartItems) {
  
              this.cartedObject = {
                color: items.color,
                customerId: localStorage.getItem("loggedUserId"),
                price: items.price,
                productId: items.productId,
                quantity: items.quantity,
                size: items.size,
                sku: items.sku,
              }
  
              console.log(this.cartedObject);
                    this.userServ.addProductToCart(this.cartedObject, localStorage.getItem("token")).subscribe(
                (response: any) => {
                  console.log(response);
  
                  this.showLoader = false;
                  this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
                    this.route.navigate(['/landingInner']);  
          
                  });
  
                },
                err => {
                  this.showLoader = false;
                  console.log(err);
  
  
  
                }
              )
  
  
            }
  
          }
  
          
        }, 1500);
      



      },
      err => {
        this.showLoader = false;
        this.showFailed = true;
        this.failedLogin = err;
        console.log(err);
        if (err.error.code == '44') {
          this.checkMailMessage = true;
        }


      }
    )






  }

  showPassword(id) {
    document.getElementById(id).setAttribute("type", "text");
    this.showPasswordIcon = false;
    this.hidePasswordIcon = true;
  }
  hidePassword(id) {
    document.getElementById(id).setAttribute("type", "password");
    this.showPasswordIcon = true;
    this.hidePasswordIcon = false;
  }

  resetPassword(userType) {
    // console.log("you will reset password for user of type " + userType);
    localStorage.setItem("resetPasswordUserType", userType);
    this.route.navigate(["/resetPassword"]);

  }

  getUserData(profileId) {
    this.userServ.getOneProfileData(profileId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("user profile data is ============");
        this.sessionUserStatus = response.data.status;
        // console.log(response);
        if (this.sessionUserStatus == "active") {
          this.userServ.activeAccount.next(true);
        }
        else {
          this.userServ.activeAccount.next(false);
        }

        localStorage.setItem("sessionUserStatus", this.sessionUserStatus);

      },
      err => {
        console.log(err);

      }
    )
  }



  getUserDataLast() {

    this.userServ.getCurrentUser(localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        // this.allUserData = response;

        localStorage.setItem("loggedUserId", response.id)




      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }
  closeError() {
    this.showFailed = false;
  }

  closeErrorActiviate() {
    this.checkMailMessage = false;
  }

}
