import { Component, OnInit } from '@angular/core';
import {  faCartPlus,faSearch,faBriefcase } from '@fortawesome/free-solid-svg-icons';
import {  faHeart } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faCartPlus = faCartPlus;
  faHeart = faHeart;
  faSearch = faSearch;
  faBriefcase = faBriefcase
  allCategories;
  masterCategory;
  masterCategoryId;
  showOfflineCart = false;;
  allOfflineCartItems = [];
  selectedlanguage = "en";
  constructor(private route: Router, private userServ: UserService){}

  ngOnInit(): void {
    // alert(this.allOfflineCartItems.length)
    this.allOfflineCartItems.length =0
    this.getAllCategories()
    this.showOfflineCart = true;
    // setTimeout(() => {
      this.allOfflineCartItems = JSON.parse(localStorage.getItem('products'));
    // }, 500);
   
  }
 

  getAllCategories() {


    this.userServ.getAllCategories().subscribe(
      (response: any) => {
        console.log(response);
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

  changeLanguage(){
    localStorage.setItem("language",this.selectedlanguage);
    this.ngOnInit()
  }

}
