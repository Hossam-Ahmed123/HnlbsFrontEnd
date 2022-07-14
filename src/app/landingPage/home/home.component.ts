import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee,faMugHot,faEnvelope,faInfinity,faLightbulb,faRocket,faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showLoggedData = false;
  faCoffee = faCoffee;
  faMugHot = faMugHot;
  faEnvelope = faEnvelope;
  faFolderOpen = faFolderOpen;
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
  flashSaleobj;
  allBrands;
  showLoader = true;
  loggedUser;
flashEnd;
dDay;

onlineMode = false;
cartitems = []
  // count down timer
  // model = new Date("Jul 15, 2022 16:37:52");
  // model = new Date("2022-02-25T00:00:00.000+00:00");

  // private timeinterval = interval;
  // private subscription!: Subscription;

  // public dateNow = new Date();
  // public dDay = this.model.getTime();
  // milliSecondsInASecond = 1000;
  // hoursInADay = 24;
  // minutesInAnHour = 60;
  // SecondsInAMinute = 60;

  // public timeDifference: any;
  // public secondsToDday: any;
  // public minutesToDday: any;
  // public hoursToDday: any;
  // public daysToDday: any;
  
  // private getTimeDifference() {
  //   this.dDay = this.model.getTime();
  //   this.timeDifference = this.dDay - new Date().getTime();
  //   this.allocateTimeUnits(this.timeDifference);
  // }

  // private allocateTimeUnits(timeDifference: any) {
  //   this.secondsToDday = Math.floor(
  //     (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
  //   );
  //   this.minutesToDday = Math.floor(
  //     (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
  //       this.SecondsInAMinute
  //   );
  //   this.hoursToDday = Math.floor(
  //     (timeDifference /
  //       (this.milliSecondsInASecond *
  //         this.minutesInAnHour *
  //         this.SecondsInAMinute)) %
  //       this.hoursInADay
  //   );
  //   this.daysToDday = Math.floor(
  //     timeDifference /
  //       (this.milliSecondsInASecond *
  //         this.minutesInAnHour *
  //         this.SecondsInAMinute *
  //         this.hoursInADay)
  //   );
  // }
  constructor(private route: Router, private userServ: UserService) { }

  ngOnInit(): void {
  
    this.loggedUser = localStorage.getItem("token");
    if(this.loggedUser != undefined || this.loggedUser !=null){
      this.showLoggedData = true;
      this.onlineMode = true;
    }
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
    // this.flashEnd = new Date("2022-02-25T00:00:00.000+00:00");
    // this.getTimeDifference()


      this.userServ.getFlashSaleProductsByCategoryId(this.masterCategoryId).subscribe(
        (response: any) => {
          // this.showLoader = false;
         
          // this.allProducts = response;
          console.log(response);
          // this.flashEnd = response.end;
          this.flashEnd = new Date(response.end);
          
          this.flashSaleobj = response;
          this.flashSaleProducts = response.flashSaleProducts;
          console.log(this.flashSaleProducts);
          // this.getTimeDifference(this.flashEnd)

          this.dDay = this.flashEnd.getTime();
          this.timeDifference = this.dDay - new Date().getTime();
          this.allocateTimeUnits(this.timeDifference);
  
        },
        err => {
          console.log(err);
       
          
  
        }
      )
    
  
    

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
  getProducts(){


    this.userServ.getProductsByMasterCategory(this.masterCategoryId).subscribe(
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
        for(let cat of this.allCategories){
          if(cat.categoryId==2){
            this.masterCategory = cat;
            this.masterCategoryId = cat.categoryId
            this.masterCover = cat.coverPhoto;

          }
        }
 
        console.log( this.masterCategory);
        this.childCatForMaster = this.masterCategory.childrenCategories;
        console.log(this.childCatForMaster );
        
        


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }



  getFlashSaleProductsByCategory(){
    this.userServ.getFlashSaleProductsByCategoryId(this.masterCategoryId).subscribe(
      (response: any) => {
        // this.showLoader = false;
       
        // this.allProducts = response;
        console.log(response);
        // this.flashEnd = response.end;
        this.flashEnd = new Date(response.end);
        
        this.flashSaleobj = response;
        this.flashSaleProducts = response.flashSaleProducts;
        console.log(this.flashSaleProducts);
        this.getTimeDifference(this.flashEnd)

      },
      err => {
        console.log(err);
     
        

      }
    )
  }


  getTopRatedProductsByCategory(){
    this.userServ.getTopRatedProductsByCategoryId(this.masterCategoryId).subscribe(
      (response: any) => {
        this.showLoader = false;
      // console.log(response);
      
        // this.allProducts = response;
        this.topRatedProducts = response;
        console.log(this.topRatedProducts);

      },
      err => {
        this.showLoader = false;
        console.log(err);
     
        

      }
    )
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

  openProduct(product) {
    this.route.navigate(["productDetails/" + product.id]);
  }

  openMasterCategory(category) {
    this.route.navigate(["mainCategory/" + category.categoryId]);
  }
  openChildcategryProducts(category) {
    this.route.navigate(["products/" + category.categoryId]);
  }



  openBrandProducts(brand){
    this.route.navigate(["brand/" + brand.id]);
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


    this.userServ.addProductToCart({},localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);

        this.showLoader = false;
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/cart']);

        });

      },
      err => {
        this.showLoader = false;
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
