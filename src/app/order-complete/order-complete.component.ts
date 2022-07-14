import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { faChevronLeft, faChevronRight,faWallet, faCheckCircle, faSignOutAlt, faTimes, faFileAlt, faCube, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faTwitter,faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {
  faCcVisa = faCcVisa;
  faWallet = faWallet;
  loggedUser;
  showLoggedData = false;
  allCartItems;
  showOfflineCart = false;;
  allOfflineCartItems = [];
  allCartCostOfflineArray = [];
  allCartCostOnlineArray = [];
  allCartCostOffline;
  allCartCostOnline;
  cartCostArray = []
  showLoader = false;
  redirectUrl;
  showBeforeRedirect = true;
  showAfterSubmit = true;
  paymentWay = "paymentgateway";
  cachOnDelivery = false;
  addShippingInfoForm: FormGroup;
  editShippingInfoForm:FormGroup;
  allUserData;
  countriesList;
 editSuccess = false;
  editFail = false;
  SelectedCountryIndex;
  filteredCities;
  selectedCityForShipping;
  allShippingFees;
  promoText = "";
  promoCodeMode = false;
  promoCodeDiscount = 0;
  showDeactive = false;
  shippingCost = 0;
  showAddShipping = false;
  constructor(private userServ: UserService,private route:Router
  ) { }
  ngOnInit(): void {
    this.getCartItems()
    this.getCountriesList()
    this.getUserData()
    setTimeout(() => {
      this.getAllShippingFees()
    }, 1000);

    this.addShippingInfoForm = new FormGroup({
      shippingAddress: new FormControl(null),
      shippingCity: new FormControl(null),
      shippingContury: new FormControl(null),
      shippingName: new FormControl(null),
    });
    this.editShippingInfoForm = new FormGroup({
      id: new FormControl(null),
      shippingAddress: new FormControl(null),
      shippingCity: new FormControl(null),
      shippingContury: new FormControl(null),
      shippingName: new FormControl(null),
    });

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

    // setTimeout(() => {

    //   this.editShippingInfoForm.get("shippingContury").setValue(this.allUserData.shipping.shippingContury)

      
    // }, 1000);



  }



  getCartItems() {

    this.userServ.getCartItems(localStorage.getItem("loggedUserId")).subscribe(
      (response: any) => {
        // console.log(response);
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


  getAllShippingFees() {
    // console.log(localStorage.getItem("token"));
    

    this.userServ.getAllShippingFees(localStorage.getItem("token")).subscribe(
      (response: any) => {
        // console.log(response);
        // console.log(this.editShippingInfoForm.get("shippingCity").value);
        
        this.allShippingFees = response
        for(const ship of this.allShippingFees){

          if(this.editShippingInfoForm.get("shippingCity").value==ship.city){

            // console.log(ship);
            this.shippingCost = ship.value;
            

          }

        }


      },
      err => {
        console.log(err);



      }
    )


  }



  deleteProductFromCartOnline(product) {
    console.log(product.product.id);

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



  addOrder() {

    const orderObj = {
      customerId:localStorage.getItem("loggedUserId"),
      // cashOnDeliveryFees:0,
      promoCode:this.promoText,
      // promoValue:this.promoCodeDiscount,
      shppingFees:this.shippingCost,
      // subTotal:this.allCartCostOnline,
      totalAmount:(this.allCartCostOnline  + this.shippingCost) - this.promoCodeDiscount
      // totalAmount:2500.0
   

    }

console.log(orderObj);

    this.showLoader = true;
    this.userServ.addOrderPaymentGateway(orderObj,localStorage.getItem("token")).subscribe(
      (response: any) => {
        this.showLoader = false;
        console.log(response);
        this.redirectUrl = response.body.data.cashierUrl;
        console.log(this.redirectUrl);
        this.showBeforeRedirect = false;
        localStorage.setItem("orderNo",response.body.data.orderNo)
        localStorage.setItem("reference",response.body.data.reference)
        setTimeout(() => {
          window.location.href = this.redirectUrl;
          
        }, 2000);
        

      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )


  }


  
  addOrderCash() {

    const orderObj = {
      customerId:localStorage.getItem("loggedUserId"),
      cashOnDeliveryFees:20,
      promoCode:this.promoText,
      promoValue:this.promoCodeDiscount,
      shippingFees:this.shippingCost,
      subTotal:this.allCartCostOnline,
      total:(this.allCartCostOnline  + this.shippingCost + 20) - this.promoCodeDiscount

    }
console.log(orderObj);

    this.showLoader = true;
    this.userServ.addOrderCash(orderObj,localStorage.getItem("token")).subscribe(
      (response: any) => {

        this.showLoader = false;
        this.showAfterSubmit = false;
        console.log(response);
        setTimeout(() => {
          this.ngOnInit()
          this.showAfterSubmit = true;
          
        }, 2000);
        
        // this.ngOnInit()
        

      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )


  }
  changePaymentWay(){

    if(this.paymentWay == 'paymentgateway'){
      this.cachOnDelivery = false;
    }
    else{
      this.cachOnDelivery = true;
    }

  }


  editShipping(){
    this.editSuccess = false;
    this.editFail = false;
    this.editShippingInfoForm.get("shippingContury").setValue(
      this.countriesList[this.SelectedCountryIndex].country
    )
    console.log(this.editShippingInfoForm.value);


    this.showLoader = true;
    this.userServ.editShippingInfo(this.editShippingInfoForm.value,this.editShippingInfoForm.get("id").value,localStorage.getItem("token")).subscribe(
   (response: any) => {
     this.showLoader = false;
     console.log(response);
     this.editSuccess = true;

     setTimeout(() => {


      this.getUserData()
       
     }, 1500);
     

   },
   err => {
     this.showLoader = false;
     console.log(err);

     this.editFail = true;



   }
 )
    
  }


  logCountryEdit(){

    // alert("country index is == " + this.addShippingInfoForm.get("shippingContury").value)

  // this.SelectedCountryIndex = this.editShippingInfoForm.get("shippingContury").value;

  // this.filteredAllSchools = this.allSchools.filter(
  //   res => {
  //     return res.AreaId == this.selectedAreaForSchools
  //   }


  // for(const cou of this.countriesList){
  //   if(this.editShippingInfoForm.get("shippingContury").value==cou.country){
  //     inde
  //   }


  this.SelectedCountryIndex = this.countriesList.findIndex(x => x.country === this.editShippingInfoForm.get("shippingContury").value ||  x.country === this.addShippingInfoForm.get("shippingContury").value );

  // console.log(this.SelectedCountryIndex);
  
//  this.addShippingInfoForm.get("shippingContury").setValue(
//    this.countriesList[SelectedCountryIndex].country
//  )


//  console.log(this.addShippingInfoForm.get("shippingContury").value);

 this.filteredCities = this.countriesList[this.SelectedCountryIndex].cities
 
  }
  getUserData() {

    this.userServ.getCurrentUser(localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        this.allUserData = response;
        if(this.allUserData.shipping!= null){

          this.showAddShipping = false;
          this.editShippingInfoForm.get("id").setValue(this.allUserData?.shipping?.id)
          this.editShippingInfoForm.get("shippingAddress").setValue(this.allUserData?.shipping?.shippingAddress)
          this.editShippingInfoForm.get("shippingCity").setValue(this.allUserData?.shipping?.shippingCity)
          this.editShippingInfoForm.get("shippingContury").setValue(this.allUserData?.shipping?.shippingContury)
          this.selectedCityForShipping = this.allUserData.shipping.id;
          // this.getShippingFeesByCountry()
          this.editShippingInfoForm.get("shippingName").setValue(this.allUserData?.shipping?.shippingName)

          this.editShippingInfoForm.get("shippingContury").setValue(this.allUserData.shipping.shippingContury)

        this.logCountryEdit()
          
        }
        else{
          this.showAddShipping = true;
        }

        // this.getShippingFeesByCountry()
        this.loggedUser = localStorage.getItem("token");

        // console.log(this.allUserData.shipping.shippingContury);
        
        // this.editShippingInfoForm.get("shippingContury").setValue(this.allUserData.shipping.shippingContury)

        // this.logCountryEdit()

      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }

  getCountriesList() {

    this.userServ.getCountriesList().subscribe(
      (response: any) => {
        // console.log(response.data);
        this.countriesList = response.data;





      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }


  getShippingFeesByCountry() {
    console.log(this.selectedCityForShipping);
    
    this.userServ.getShippingFeesById(this.selectedCityForShipping,localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        // this.allCartItems = response;


 



      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }


  checkPromoCode(){

    // console.log(this.promoText);

this.showLoader = true;
    this.userServ.getPromoCodeForUser(this.promoText,localStorage.getItem("loggedUserId"),localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        if(response != null){
          this.promoCodeMode = true;
          this.promoCodeDiscount = response;
          this.showDeactive = true;
          this.showLoader = false;

        }
       
        this.showLoader = false;


 



      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )


    

  }

  clearPromo(){
    this.promoCodeMode = false;
        this.promoCodeDiscount = 0;
        this.showDeactive = false;

  }



  changeShipping(){
    for(const ship of this.allShippingFees){

      if(this.editShippingInfoForm.get("shippingCity").value==ship.city){

        console.log(ship);
        this.shippingCost = ship.value;
        

      }

    }
  }

  addShipping() {

    this.addShippingInfoForm.get("shippingContury").setValue(
      this.countriesList[this.SelectedCountryIndex].country
    )
    console.log(this.addShippingInfoForm.value);
    this.showLoader = true;
    this.userServ.addShippingInfo(this.addShippingInfoForm.value, localStorage.getItem("loggedUserId"), localStorage.getItem("token")).subscribe(
      (response: any) => {
        this.showLoader = false;
        console.log(response);
        this.getUserData()
        this.changeShipping() 


      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )



  }
  
}
