import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrls: ['./brand-products.component.css']
})
export class BrandProductsComponent implements OnInit {
  brandIdShoot;
  allProducts;
  loggedUser;
  showLoggedData = false;
  constructor(private route: Router, private userServ: UserService,private actroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("token");
    if(this.loggedUser != undefined || this.loggedUser !=null){
      this.showLoggedData = true;
    }
    this.brandIdShoot = this.actroute.snapshot.params["id"];
    console.log(this.brandIdShoot);

    this.userServ.getProductsByBrand(this.brandIdShoot).subscribe(
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
