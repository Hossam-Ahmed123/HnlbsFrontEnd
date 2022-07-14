import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userServ: UserService) { }
  userLogged;
  savedLanguage;
  languge ="en";
  ngOnInit() {

    this.savedLanguage = localStorage.getItem("language");
    if(this.savedLanguage==null || this.savedLanguage == undefined || this.savedLanguage == "en"){
      this.languge = "en";

    }
    else{
      this.languge = "ar";

    }

  } 
  onActivate(event) {
    window.scroll(0,0);

}
}
