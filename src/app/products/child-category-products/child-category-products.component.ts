import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-child-category-products',
  templateUrl: './child-category-products.component.html',
  styleUrls: ['./child-category-products.component.css']
})
export class ChildCategoryProductsComponent implements OnInit {
  productIdShoot;
  allProducts;
  loggedUser;
  showLoggedData = false;
  constructor(private route: Router, private userServ: UserService,private actroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("token");
    if(this.loggedUser != undefined || this.loggedUser !=null){
      this.showLoggedData = true;
    }
    this.productIdShoot = this.actroute.snapshot.params["id"];
    console.log(this.productIdShoot);

    this.userServ.getProductsByChildCategory(this.productIdShoot).subscribe(
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

  openProduct(product) {
    this.route.navigate(["productDetails/" + product.id]);
  }

}
