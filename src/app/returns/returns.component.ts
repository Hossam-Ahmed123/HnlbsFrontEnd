import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit {

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
