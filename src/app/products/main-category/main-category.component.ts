import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCoffee,faMugHot,faEnvelope,faInfinity,faLightbulb,faRocket } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css']
})
export class MainCategoryComponent implements OnInit {

  faCoffee = faCoffee;
  faMugHot = faMugHot;
  faEnvelope = faEnvelope;
  faInfinity = faInfinity;
  faLightbulb = faLightbulb;
  faRocket = faRocket;
  allProducts;
  allCategories;
  masterCategory;
  masterCategoryId;
  childCatForMaster;
  flashSaleProducts;
  projectIdShoot;
  constructor(private route: Router, private userServ: UserService,private actroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectIdShoot = this.actroute.snapshot.params["id"];
    console.log(this.projectIdShoot);

    // localStorage.clear();
    //   localStorage
   
    this.getAllCategories()

      this.getProducts()
      this.getFlashSaleProductsByCategory()
      


  }



  getProducts(){


    this.userServ.getProductsByMasterCategory(this.projectIdShoot).subscribe(
      (response: any) => {
        // this.showLoader = false;
        console.log(response);
        this.allProducts = response;
   

      },
      err => {
        console.log(err);
     
        

      }
    )
  }
  getAllCategories() {


    this.userServ.getAllCategories().subscribe(
      (response: any) => {
        console.log(response);
        this.allCategories = response
    
 

        // this.childCatForMaster = this.masterCategory.childrenCategories;
        // console.log(this.childCatForMaster );
        
        


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }



  getFlashSaleProductsByCategory(){
    this.userServ.getFlashSaleProductsByCategoryId(this.projectIdShoot).subscribe(
      (response: any) => {
        // this.showLoader = false;
      
        // this.allProducts = response;
        // this.flashSaleProducts = response.flashSaleProducts;
        // console.log(this.flashSaleProducts);

      },
      err => {
        console.log(err);
     
        

      }
    )
  }


  openProduct(product) {
    this.route.navigate(["productDetails/" + product.id]);
  }

  openMasterCategory(category) {
    this.route.navigate(["mainCategory/" + category.categoryId]);
  }
  

}
