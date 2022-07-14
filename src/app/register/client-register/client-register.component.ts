import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../services/upload-file.service';
import { UserService } from '../../services/user.service';
import { UUIDService } from '../../services/uuid.service';
import { faEye, faEyeSlash, faCheckCircle, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {
  faEye = faEye;
  faExclamationCircle = faExclamationCircle;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  faExclamationTriangle = faExclamationTriangle;
  showLoader = false;
  showPasswordIcon: boolean = true;
  hidePasswordIcon: boolean = false;
  registerForm: FormGroup;
  showFormSubmit: boolean;
  showSuccessMessage: boolean;
  showFailMessage: boolean;
  errorDetails: string;
  allCountries: any;
  notSelected = false;
  constructor(private userServ: UserService, private uploadServ: UploadFileService, private route:Router) { }
  uuidValue: any;
  userType: string = "client";
  regex;
  ngOnInit(): void {
    this.regex = /^01[0125][0-9]{8}$/gm;
    this.showFormSubmit = true;
    this.showSuccessMessage = false;
    this.showFailMessage = false;
    this.registerForm = new FormGroup({

      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      phone: new FormControl(null,Validators.required)
    });
  }
  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {
        console.log(typeof (upData));
        this.registerForm.controls['attach'].setValue(upData);
      }
    )
  }
  register() {
   
      this.showLoader = true;
      console.log(this.registerForm.value);
      this.userServ.signUp(this.registerForm.value).subscribe(
        (response: any) => {
          this.showFormSubmit = false;
          this.showFailMessage = false;
          this.showSuccessMessage = true;
          console.log("successfully registered ");
          console.log(response);
          this.showLoader = false;

          setTimeout(() => {
            this.route.navigate(["/login"]);
          }, 2000);
        
        },
        err => {
          console.log(err);
          this.showLoader = false;
          this.showFailMessage = true;


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


}
