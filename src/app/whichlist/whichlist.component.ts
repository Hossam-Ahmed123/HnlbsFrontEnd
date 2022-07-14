import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { faFolderOpen, faTrashAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-whichlist',
  templateUrl: './whichlist.component.html',
  styleUrls: ['./whichlist.component.css']
})
export class WhichlistComponent implements OnInit {
  loggedUser;
  showLoggedData = false;
  allWhichListItems;
  faFolderOpen = faFolderOpen;
  faBriefcase = faBriefcase;
  faTrashAlt = faTrashAlt;
  showLoader;
  cartedObject;
  constructor(private userServ: UserService, private route: Router
  ) { }

  ngOnInit(): void {

    this.loggedUser = localStorage.getItem("token");
    if (this.loggedUser != undefined || this.loggedUser != null) {
      this.showLoggedData = true;
      this.getUserData()

    }
    else {

      this.showLoggedData = false;

    }

  }


  getUserData() {

    this.userServ.getCurrentUser(localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        this.allWhichListItems = response.wishList;




      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }




  deleteProductFromWhishlist(product) {
    console.log(product.id);



    this.showLoader = true;
    this.userServ.deleteProductFromWhishlist(localStorage.getItem("loggedUserId"), product.id, localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        this.getUserData()
        this.showLoader = false;



      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )

  }


  openProduct(product) {
    this.route.navigate(["productDetails/" + product.id]);
  }

}
