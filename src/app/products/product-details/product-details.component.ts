import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { faCoffee, faChevronDown, faMugHot, faEnvelope, faInfinity, faTruck, faHeart, faChevronUp, faLightbulb, faRocket, faCalendar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faGetPocket } from '@fortawesome/free-brands-svg-icons';


import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [NgbCarouselConfig]
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;

  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);
  projectIdShoot;
  childCategoryID;
  productDetails;
  faTruck = faTruck;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faGetPocket = faGetPocket;
  faCalendar = faCalendar;
  faMoneyBill = faMoneyBill;
  faHeart = faHeart;
  childImages;
  activeSliderId = 0;
  showLoader = true;
  cartitems = []
  loggedUser;
  showLoggedData = false;
  onlineMode = false;
  mostCommonProducts;
  addreviewForm: FormGroup;
  showRatingDialog = false;
  currentRate = 0;
  overAllRate = 5;
  availableColors;
  cartedObject;
  selectedColor = null;
  selectedQuantity = 1;
  selectedSize;
  selectedPrice;
  selectedProductId;
  selectedProductImage;
  selectedProductName;
  selectedku;
  showSize = false;
  public isCollapsed = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;

  constructor(private userServ: UserService, private actroute: ActivatedRoute, config: NgbCarouselConfig, private route: Router) {
    config.interval = 1;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.ngCarousel.pause();

    }, 1000);
    // this.activeSliderId = 0;
    // this.ngCarousel.select('0');
    // this.ngCarousel.pause();
    // this.ngCarousel.activeId='2';
    this.addreviewForm = new FormGroup({
      content: new FormControl(null, Validators.required),
      customerrId: new FormControl(null),
      productId: new FormControl(null),
      rating: new FormControl(null, Validators.required),
      title: new FormControl(null),

    })
    // this.ngCarousel.select("slide0");
    this.loggedUser = localStorage.getItem("token");

    if (this.loggedUser != undefined || this.loggedUser != null) {
      this.showLoggedData = true;
      this.onlineMode = true;
    }
    this.projectIdShoot = this.actroute.snapshot.params["id"];
    console.log(this.projectIdShoot);


    this.addreviewForm.get("customerrId").setValue(localStorage.getItem("loggedUserId"))
    this.addreviewForm.get("productId").setValue(this.projectIdShoot)

    this.userServ.getProductDetails(this.projectIdShoot).subscribe(
      (response: any) => {
        console.log(response);
        this.productDetails = response
        // this.childImages = response.childImages;
        this.childImages = this.productDetails.childImages;
        this.childCategoryID = response.category.categoryId;
        // this.getProductColorsByName(response.name)
        this.getProductColorsByColorGroup(response.colorGroupCode)

        // alert(this.childCategoryID)
        this.getMostCommonProducts()
        this.showLoader = false;

        // this.allProducts = response;
      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )



  }

  cycleToSlide(photo) {
    console.log(photo);
    let slideId = photo.id - 2;
    // this.ngbC.select(photo);
    // this.activeSliderId = "slide-ngb-slide-" + slideId;
    // this.activeSliderId = "slide-ngb-slide-" + (+slideId);
    // console.log("slide-ngb-slide-" + (+slideId));
  }


  navigateToSlide(item) {
    this.ngCarousel.select(item);
    // console.log(item)
  }

  addToCart(item) {
    // const cartitems = []
    if (item)
      this.cartitems.push(item)
    localStorage.setItem("cartArray", JSON.stringify(this.cartitems))
  }


  addProductToCartOnline() {
    if (this.selectedColor == null) {
      alert("select color")
    }
    else if (this.selectedSize == null) {
      alert("select size")
    }
    else {


      this.cartedObject = {
        color: this.selectedColor,
        customerId: localStorage.getItem("loggedUserId"),
        price: this.selectedPrice,
        productId: this.selectedProductId,
        quantity: 1,
        size: this.selectedSize,
        sku: this.selectedku,
      }

      console.log(this.cartedObject);
      this.userServ.addProductToCart(this.cartedObject, localStorage.getItem("token")).subscribe(
        (response: any) => {
          console.log(response);

          this.showLoader = false;
          this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
            this.route.navigate(['/productDetails/' + this.projectIdShoot]);

          });

        },
        err => {
          this.showLoader = false;
          console.log(err);



        }
      )


    }



  }

  addProductToCartOffline(item) {
    if (this.selectedColor == null) {
      alert("select color")
    }
    else if (this.selectedSize == null) {
      alert("select size")
    }

    else {


      let products = [];
      if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
      }
      if (products.length == 0) {
        // console.log("111111");

        this.cartedObject = {
          name: this.selectedProductName,
          image: this.selectedProductImage,
          color: this.selectedColor,
          customerId: localStorage.getItem("loggedUserId"),
          price: this.selectedPrice,
          productId: this.selectedProductId,
          quantity: 1,
          size: this.selectedSize,
          sku: this.selectedku,
        }
        products.push(this.cartedObject);
        this.route.navigateByUrl('/headerVirtual', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/productDetails/' + this.projectIdShoot]);

        });


      }
      else {
        // console.log("22222");
        for (const pro of products) {
          if (pro.productId != this.selectedProductId) {
            this.cartedObject = {
              name: this.selectedProductName,
              image: this.selectedProductImage,
              color: this.selectedColor,
              customerId: localStorage.getItem("loggedUserId"),
              price: this.selectedPrice,
              productId: this.selectedProductId,
              quantity: 1,
              size: this.selectedSize,
              sku: this.selectedku,
            }
            products.push(this.cartedObject);
            this.route.navigateByUrl('/headerVirtual', { skipLocationChange: true }).then(() => {
              this.route.navigate(['/productDetails/' + this.projectIdShoot]);

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

  deleteProductToCartOnline() {


    this.userServ.deleteProductFromCart(localStorage.getItem("token"), this.projectIdShoot, localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);

        this.showLoader = false;

        // this.allProducts = response;
      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )

  }





  removeProductFromCartOffline(item) {

    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(product => product.id !== item.id);
    localStorage.setItem('products', JSON.stringify(products));
  }



  getMostCommonProducts() {
    this.userServ.getMostCommonProducts(this.projectIdShoot, this.childCategoryID).subscribe(
      (response: any) => {
        console.log(response);
        this.mostCommonProducts = response
        // this.childImages = response.childImages;

        this.showLoader = false;

        // this.allProducts = response;
      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )
  }


  getProductColorsByName(productName) {
    this.userServ.getProductColorsByName(productName).subscribe(
      (response: any) => {
        console.log(response);
        this.availableColors = response
        // this.childImages = response.childImages;

        // this.showLoader = false;

        // this.allProducts = response;
      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )
  }


  getProductColorsByColorGroup(colorGroup) {
    this.userServ.getProductColorsByColorGroub(colorGroup).subscribe(
      (response: any) => {
        console.log(response);
        this.availableColors = response
        // this.childImages = response.childImages;

        // this.showLoader = false;

        // this.allProducts = response;
      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )
  }




  openReviewDialog() {
    this.showRatingDialog = true;
  }

  closeReviewDialog() {
    this.showRatingDialog = false;
  }
  addReview() {
    console.log(this.addreviewForm.value);

  }


  openDetails(Pcolor) {
    this.selectedSize = null;
    this.selectedQuantity = 0;
    this.showSize = true;

    // this.se
    // console.log(Pcolor);

    this.productDetails = Pcolor
    this.childImages = Pcolor.childImages;
    this.ngCarousel.cycle();

    // setTimeout(() => {
    //   this.ngCarousel.pause();

    // }, 1200);
    this.selectedColor = Pcolor.color;
    this.selectedPrice = Pcolor.price;
    this.selectedProductId = Pcolor.id;
    this.selectedku = Pcolor.sku;
    this.selectedProductName = Pcolor.name;
    this.selectedProductImage = Pcolor.masterImage;
    setTimeout(() => {
      this.ngCarousel.pause();

    }, 500);


  }

  increaseQuantity() {
    this.selectedQuantity = this.selectedQuantity + 1;
  }
  decreaseQuantity() {
    this.selectedQuantity = this.selectedQuantity - 1;
  }



  openProduct(product) {

    this.route.navigateByUrl('/headerVirtual', { skipLocationChange: true }).then(() => {
      this.route.navigate(["productDetails/" + product.id]);

    });

  }

  addProductToWhchlist() {
    this.showLoader = true;
    const whichlistObj = {
      clinetId: localStorage.getItem("loggedUserId"),
      productId: this.projectIdShoot
    }
    this.userServ.addProductToWhishlist(whichlistObj, localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);

        this.showLoader = false;
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/productDetails/' + this.projectIdShoot]);

        });

      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )





    // this.route.navigateByUrl('/headerVirtual', { skipLocationChange: true }).then(() => {
    //   this.route.navigate(['/productDetails/' + this.projectIdShoot]); 

    // });

  }

}
