import { Component, OnInit } from '@angular/core';
import {  faCartPlus,faSearch,faBriefcase,faSignOutAlt,faUserAlt } from '@fortawesome/free-solid-svg-icons';
import {  faHeart } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-after-login-header',
  templateUrl: './after-login-header.component.html',
  styleUrls: ['./after-login-header.component.css']
})
export class AfterLoginHeaderComponent implements OnInit {
  faCartPlus = faCartPlus;
  faHeart = faHeart;
  faSearch = faSearch;
  faUserAlt = faUserAlt;
  faSignOutAlt = faSignOutAlt;
  faBriefcase = faBriefcase
  allCategories;
  masterCategory;
  masterCategoryId;
  loggedUserName;
  allCartItems;
  allWhichListItems;
  constructor(private route: Router, private userServ: UserService){}

  ngOnInit(): void {
    this.getAllCategories()
    this.getUserData()
    setTimeout(() => {
      this.getCartItems()
    }, 500);
 
  }


  getAllCategories() {


    this.userServ.getAllCategories().subscribe(
      (response: any) => {
        // console.log(response);
        this.allCategories = response
        for(let cat of this.allCategories){
          if(cat.categoryId==2){
            this.masterCategory = cat;
            this.masterCategoryId = cat.categoryId

          }
        }
        


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }

  openMasterCategory(category) {
    // this.route.navigate(["mainCategory/" + category.categoryId]);


    this.route.navigateByUrl('/headerVirtual', { skipLocationChange: true }).then(() => {
      this.route.navigate(["mainCategory/" + category.categoryId]);

    });
    
  }

  signOut(){
    this.route.navigate(["/login"]);
    localStorage.clear();
  }


  getUserData(){

    this.userServ.getCurrentUser(localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        this.loggedUserName = response.name;
        this.allWhichListItems = response.wishList;
        localStorage.setItem("loggedUserId",response.id)
       
        


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }



  getCartItems(){

    this.userServ.getCartItems(localStorage.getItem("loggedUserId")).subscribe(
      (response: any) => {
        // console.log(response);
        this.allCartItems = response;
       
        


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }
  

}
