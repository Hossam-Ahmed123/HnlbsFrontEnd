import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCoffee, faMugHot, faEnvelope, faInfinity, faLightbulb, faRocket, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit {
  loggedUser;
  showLoggedData = false;
  faCoffee = faCoffee;
  faFolderOpen = faFolderOpen;
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
  topRatedProducts;
  masterCover;
  productIdShoot;
  allBrands;
  flashEnd;
  dDay;
  onlineMode = false;
  cartitems = []
  constructor(private route: Router, private userServ: UserService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("token");
    if (this.loggedUser != undefined || this.loggedUser != null) {
      this.showLoggedData = true;
      this.onlineMode = true;
    }
    this.productIdShoot = this.actRoute.snapshot.params["id"];
    console.log(this.productIdShoot);
    // localStorage.clear();
    //   localStorage

    this.getAllCategories()
    this.getAllBrands()
    setTimeout(() => {
      this.getProducts()
      this.getFlashSaleProductsByCategory()
      this.getTopRatedProductsByCategory()
      this.startInterval();

    }, 1000);

  }

  private timeinterval = interval;
  private subscription!: Subscription;

  public dateNow = new Date();

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;
   getTimeDifference(date) {
    this.dDay = date.getTime();
    this.timeDifference = this.dDay - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

   allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }

  openBrandProducts(brand) {
    this.route.navigate(["brand/" + brand.id]);
  }
  getAllBrands() {


    this.userServ.getAllBrands().subscribe(
      (response: any) => {
        console.log(response);
        this.allBrands = response


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }
  getProducts() {


    this.userServ.getProductsByMasterCategory(this.productIdShoot).subscribe(
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
        for (let cat of this.allCategories) {
          if (cat.categoryId == this.productIdShoot) {
            this.masterCategory = cat;
            this.masterCategoryId = cat.categoryId
            this.masterCover = cat.coverPhoto;

          }
        }

        console.log(this.masterCategory);
        this.childCatForMaster = this.masterCategory.childrenCategories;
        console.log(this.childCatForMaster);




      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }



  getFlashSaleProductsByCategory() {
    this.userServ.getFlashSaleProductsByCategoryId(this.productIdShoot).subscribe(
      (response: any) => {
        // this.showLoader = false;

        // this.allProducts = response;
        console.log(response);
        this.flashSaleProducts = response.flashSaleProducts;
        this.flashEnd = new Date(response.end);
        console.log(this.flashSaleProducts);

      },
      err => {
        console.log(err);



      }
    )
  }


  getTopRatedProductsByCategory() {
    this.userServ.getTopRatedProductsByCategoryId(this.productIdShoot).subscribe(
      (response: any) => {
        // this.showLoader = false;
        // console.log(response);

        // this.allProducts = response;
        this.topRatedProducts = response;
        console.log(this.topRatedProducts);

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
  openChildcategryProducts(category) {
    this.route.navigate(["products/" + category.categoryId]);
  }
  startInterval() {
    this.subscription = this.timeinterval(1000).subscribe(x => {
      // console.log('get TD', this.timeDifference);
      this.getTimeDifference(this.flashEnd);
    });
  }


  addToCart(item) {
    // const cartitems = []
    if (item)
      this.cartitems.push(item)
    localStorage.setItem("cartArray", JSON.stringify(this.cartitems))
  }


  addProductToCartOnline(item) {


    this.userServ.addProductToCart({},  localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);

        // this.showLoader = false;
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/cart']);

        });

      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )

  }

  addProductToCartOffline(item) {

    let products = [];
    if (localStorage.getItem('products')) {
      products = JSON.parse(localStorage.getItem('products'));
    }
    if (products.length == 0) {
      products.push(item);
      this.route.navigateByUrl('/headerVirtual', { skipLocationChange: true }).then(() => {
        this.route.navigate(['/cart']);

      });


    }
    else {
      for (const pro of products) {
        if (pro.id != item.id) {
          products.push(item);
          this.route.navigateByUrl('/headerVirtual', { skipLocationChange: true }).then(() => {
            this.route.navigate(['/cart']);

          });

        }
        else {
          // alert("added before")
        }
      }


    }



    localStorage.setItem('products', JSON.stringify(products));
  }
}
