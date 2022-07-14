import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-subscripbtions',
  templateUrl: './subscripbtions.component.html',
  styleUrls: ['./subscripbtions.component.css']
})
export class SubscripbtionsComponent implements OnInit {

  showloader = true;
  allSubscriptions;
  constructor(private userServ: UserService) { }

  ngOnInit(): void {

    this.getAllSubscriptions()
  }

  getAllSubscriptions(){

    this.userServ.getAllSubscribtions(localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("---------------");
        
        console.log(response);
        this.showloader = false;
        this.allSubscriptions = response


      },
      err => {
        this.showloader = false;
        console.log(err);



      }
    )

  }

}
