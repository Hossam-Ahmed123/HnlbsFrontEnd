import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  loggedUser;
  showLoggedData = false;
  constructor() { }

  ngOnInit(): void {

    this.loggedUser = localStorage.getItem("token");
    if(this.loggedUser != undefined || this.loggedUser !=null){
      this.showLoggedData = true;
    }
  }

}
