import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-to-track',
  templateUrl: './how-to-track.component.html',
  styleUrls: ['./how-to-track.component.css']
})
export class HowToTrackComponent implements OnInit {
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
