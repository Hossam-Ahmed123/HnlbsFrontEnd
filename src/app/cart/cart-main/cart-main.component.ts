import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.css']
})
export class CartMainComponent implements OnInit {
  loggedUser;
  showLoggedData = false;
  allCartItems;
  showOfflineCart = false;
  faHeart = faHeart;
  allOfflineCartItems = [];
  allCartCostOfflineArray = [];
  allCartCostOnlineArray = [];
  allCartCostOffline;
  allCartCostOnline;
  cartCostArray = []
  showLoader = false;
  redirectUrl;
  showBeforeRedirect = true;
  selectedQuantity = 1;
  productToEditQuantity;
  constructor(private userServ: UserService,private route:Router
  ) { }

  ngOnInit(): void {
    this.getCartItems()
    this.loggedUser = localStorage.getItem("token");
    if (this.loggedUser != undefined || this.loggedUser != null) {
      this.showLoggedData = true;

    }
    else{
      this.showOfflineCart = true;
      this.allOfflineCartItems = JSON.parse(localStorage.getItem('products'));
      if(this.allOfflineCartItems.length!=0){

        for (const it of this.allOfflineCartItems ){
          // this.allCartCostOfflineArray.push(it.price)
          this.allCartCostOfflineArray.push(it.price * it.quantity)

        }

        this.allCartCostOffline = this.allCartCostOfflineArray.reduce(
          (current, sum) => {
            return current + sum;
          }
        )
       
      }

    }

  }



  getCartItems() {

    this.allCartCostOnlineArray.length =0;
    this.allCartCostOnline = 0;
    this.userServ.getCartItems(localStorage.getItem("loggedUserId")).subscribe(
      (response: any) => {
        console.log(response);
        this.allCartItems = response;


        if(this.allCartItems.length!=0){

          for (const it of this.allCartItems ){
            this.allCartCostOnlineArray.push(it.totalPrice)
  
          }
  
          this.allCartCostOnline = this.allCartCostOnlineArray.reduce(
            (current, sum) => {
              return current + sum;
            }
          )
         
        }




      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }




  deleteProductFromCartOnline(product) {
    console.log(product.product.id);



    this.showLoader = true;
    const whichlistObj = {
      clinetId: localStorage.getItem("loggedUserId"),
      productId: product.product.id
    }
    this.userServ.addProductToWhishlist(whichlistObj, localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);

    

      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )



    this.userServ.deleteProductFromCart(localStorage.getItem("loggedUserId"), product.product.id, localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/cart']);

        });
        this.getCartItems()
      },
      err => {
        console.log(err);



      }
    )

  }



  removeProductFromCartOffline(item){

    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(product => product.id !== item.id );
    localStorage.setItem('products', JSON.stringify(products));
    this.route.navigateByUrl('/headerVirtual', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/cart']);

    });
  }



  // addOrder() {

  //   const orderObj = {
  //     customerId:localStorage.getItem("loggedUserId")
  //   }

  //   this.showLoader = true;
  //   this.userServ.addOrder(orderObj,localStorage.getItem("token")).subscribe(
  //     (response: any) => {
  //       this.showLoader = false;
  //       console.log(response);
  //       this.redirectUrl = response.body.redirect_url;
  //       console.log(this.redirectUrl);
  //       this.showBeforeRedirect = false;

  //       setTimeout(() => {
  //         window.location.href = this.redirectUrl;
          
  //       }, 2000);
        

  //     },
  //     err => {
  //       this.showLoader = false;
  //       console.log(err);



  //     }
  //   )


  // }
  increaseQuantity(product){
    this.showLoader = true;
const lastQuan = product.quantity+1
console.log(lastQuan);
const obj = {
  quantity:lastQuan
}
///updateCartItem(customerId,productId,data, token)
this.userServ.updateCartItem(localStorage.getItem("loggedUserId"),product.product.id,obj,localStorage.getItem("token")).subscribe(
  (response: any) => {
   
    this.getCartItems()

    this.showLoader = false;
    // this.ngOnInit();



  },
  err => {
    this.showLoader = false;
    // this.showLoader = false;
    console.log(err);



  }
)

    
    // this.selectedQuantity = this.selectedQuantity+1;
    // item = item+1;
  }
  decreaseQuantity(product){
    this.showLoader = true;
    // this.selectedQuantity = this.selectedQuantity-1;
    // item = item-1;


    const lastQuan = product.quantity-1
console.log(lastQuan);
const obj = {
  quantity:lastQuan
}
///updateCartItem(customerId,productId,data, token)
this.userServ.updateCartItem(localStorage.getItem("loggedUserId"),product.product.id,obj,localStorage.getItem("token")).subscribe(
  (response: any) => {
  
    this.getCartItems()
    this.showLoader = false;
    // this.ngOnInit();





  },
  err => {
    this.showLoader = false;
    // this.showLoader = false;
    console.log(err);



  }
)

  }

  


}
