import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faFacebookF,faTwitter,faInstagram,faLinkedinIn,faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { UserService } from 'src/app/services/user.service';
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private userServ: UserService) { }
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedinIn = faLinkedinIn;
  faWhatsapp = faWhatsapp;
  dateNow;
  subscriptionForm:FormGroup;
  showLoader = false;
  submitSuccess = false;
  submitFail = false;
  // faMugHot = faMugHot;
  // faEnvelope = faEnvelope;
  ngOnInit(): void {
    this.dateNow = new Date();
    this.subscriptionForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),

    })
  }


  subscribe(){
    this.submitFail = false;
    this.submitSuccess = false;
    this.showLoader = true;
    console.log(this.subscriptionForm.value);

    this.userServ.subscripeNewsletter(this.subscriptionForm.value).subscribe(
      (response: any) => {
        this.showLoader = false;
  
  this.submitSuccess = true;
  setTimeout(() => {
    this.submitSuccess = false;
    this.subscriptionForm.reset()
  }, 1000);
  
  
  
  
  
      },
      err => {
        console.log(err);
        
        this.submitFail = true;
  
      }
    )
    

  }



}
