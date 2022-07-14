import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activeAccount = new BehaviorSubject<boolean>(false);
  messageToRead = new BehaviorSubject<any>("");
  selectedUser = new BehaviorSubject<any>("");
  baseUrl: string = "http://137.184.146.80:8080/hanlbs/";
  locaalBase = "http://localhost:8080/hanlbs/";

  // baseUrl:string = "http://www.tazwedservices.net/rest/api/v1/";   
  constructor(private http: HttpClient) {
  }

  // new user method
  signUp(data) {
    return this.http.post(this.baseUrl + 'customerRegister', data);

  }

  // login method

  AdminsignIn(data) {

    return this.http.post('http://137.184.146.80:8080/hanlbs/controllogin', data);
  }
  signIn(data) {

    return this.http.post('http://137.184.146.80:8080/hanlbs/CustomerLogin', data);
  }

  getAllCategories() {

    return this.http.get('http://137.184.146.80:8080/hanlbs/category/allcate');
  }

  getSubCategory(catId) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/category/categoryById/' + catId);
  }


  //http://137.184.146.80:8080/hanlbs/category/categoryById/1

  getAllBrands() {

    return this.http.get('http://137.184.146.80:8080/hanlbs/brands/getBrands');
  }


  getAllProducts() {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/products');
  }

  addProduct(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/addoneProduct', data, { headers: headers });
  }

  addCategory(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/addCategory', data, { headers: headers });
  }

  addSizeToOldProduct(productId,data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/addSizeToOldProduct/' + productId, data, { headers: headers });
  }


  


  updateCategoryCoverPhoto(id, body, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.put('http://137.184.146.80:8080/hanlbs/updateCategoryCover/' + id, body, { headers: headers });
  }



  addShippingFees(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/ShippingFeesAPI/addShippingFees', data, { headers: headers });

  }


  

  confirmOrderAfterPay(orderKey,token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/orderApi/ConfirmOrderAfterPay/' + orderKey,{}, { headers: headers });

  }

  editShippingFees(data, id, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/ShippingFeesAPI/editShippingFees/' + id, data, { headers: headers });

  }



  getAllShippingFees(token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.get('http://137.184.146.80:8080/hanlbs/ShippingFeesAPI/AllFees', { headers: headers });

  }

  getShippingFeesByCountry(country,token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.get('http://137.184.146.80:8080/hanlbs/ShippingFeesAPI/getShippingValue/' + country, { headers: headers });

  }


  getShippingFeesById(id,token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    console.log('http://137.184.146.80:8080/hanlbs/ShippingFeesAPI/getShippingValue/' + id);
    
    return this.http.get('http://137.184.146.80:8080/hanlbs/ShippingFeesAPI/getShippingValue/' + id, { headers: headers });

  }

  //http://137.184.146.80:8080/hanlbs/ShippingFeesAPI/getShippingValue/1



  addPromoCodeLast(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/PromoCodeAPI/addPromo', data, { headers: headers });

  }

   getAllPromoCodesLast(token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.get('http://137.184.146.80:8080/hanlbs/PromoCodeAPI/getAllPromoCodes', { headers: headers });

  }

  editPromoCodeLast(id,data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/PromoCodeAPI/EditPromo/' + id, data, { headers: headers });

  }
  deletePromoCodeLast(id, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.delete('http://137.184.146.80:8080/hanlbs/PromoCodeAPI/DeletePromo/' + id, { headers: headers });

  }




  asignPromoCodeToUser(promoid,userid,token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.put('http://137.184.146.80:8080/hanlbs/PromoCodeAPI/linkPromoCode/' + promoid + "/" + userid,{}, { headers: headers });

  }


  getPromoCodeForUser(promoName,userid,token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    console.log('http://137.184.146.80:8080/hanlbs/PromoCodeAPI/PromoValueForCustomer/' + promoName + "/" + userid);
    
    return this.http.get('http://137.184.146.80:8080/hanlbs/PromoCodeAPI/PromoValueForCustomer/' + promoName + "/" + userid, { headers: headers });

  }

  getCustomerOrders(userid,token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    
    return this.http.get('http://137.184.146.80:8080/hanlbs/orderApi/customer/' + userid + "/Orders", { headers: headers });

  }

  getOrderDetails(orderKey,token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    
    return this.http.get('http://137.184.146.80:8080/hanlbs/orderApi/ordersDetails/' + orderKey, { headers: headers });

  }


  getOrderPersonInAdmin(orderKey,token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    
    return this.http.get('http://137.184.146.80:8080/hanlbs/customerapi/getOrderCustomerDetails/' + orderKey, { headers: headers });

  }




  getAllUsers(token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    console.log("http://137.184.146.80:8080/hanlbs/customerapi/AllCustomers");
    
    return this.http.get('http://137.184.146.80:8080/hanlbs/customerapi/AllCustomers' , { headers: headers });

  }




  
  // editShippingFees(data, id, token) {

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': token

  //   })
  //   return this.http.post('http://137.184.146.80:8080/hanlbs/ShippingFeesAPI/editShippingFees/' + id, data, { headers: headers });

  // }



  // getAllShippingFees(token) {

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': token

  //   })
  //   return this.http.get('http://137.184.146.80:8080/hanlbs/ShippingFeesAPI/AllFees', { headers: headers });

  // }




  addBrand(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/addBrand', data, { headers: headers });

  }


  editBrand(body, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/updateBrand', body, { headers: headers });

  }


  deleteProduct(id, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.delete('http://137.184.146.80:8080/hanlbs/deleteProduct/' + id, { headers: headers });
  }


  editProduct(id, data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.put('http://137.184.146.80:8080/hanlbs/updateProducts/' + id, data, { headers: headers });
  }


  editProductSize(sizeId, data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.put('http://137.184.146.80:8080/hanlbs/updateProductSize/' + sizeId, data, { headers: headers });
  }


  getProductColorsByName(productName) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/getproductByNamecolorGroub/' + productName);
  }


  getProductColorsByColorGroub(colorGroup) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/getproductByNamecolorGroub/' + colorGroup);
  }



  getProductsByMasterCategory(id) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/productsbyMasterCategory/' + id);
  }

  getProductsByChildCategory(id) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/productsbyCategory/' + id);
  }

  getProductsByBrand(id) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/productsByBrand/' + id);
  }
  getProductDetails(id) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/getproductById/' + id);
  }





  // Flash Sale

  getAllFlashSales() {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/AllFlashSale');
  }

  addFlashSale(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.post('http://137.184.146.80:8080/hanlbs/addFlashSale', data, { headers: headers });
  }

  UpdateFlashSale(id, data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.put('http://137.184.146.80:8080/hanlbs/updateFlashSale/' + id, data, { headers: headers });
  }



  deleteFlashSale(id, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.delete('http://137.184.146.80:8080/hanlbs/deleteFlashSale/' + id, { headers: headers });
  }


  getAllProductsOutFlashSale() {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/productWithNoFlashSale');
  }

  addProductToFlashSale(flashid, prodid, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    console.log('http://137.184.146.80:8080/hanlbs/addprodToFlashSale/' + prodid + "/" + flashid);

    return this.http.get('http://137.184.146.80:8080/hanlbs/addprodToFlashSale/' + prodid + "/" + flashid, { headers: headers });
  }



  deleteProductFromFlashSale(prodid, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.delete('http://137.184.146.80:8080/hanlbs/removeProductfromFlashSale/' + prodid, { headers: headers });
  }

  getAllProductsByFlashSaleId(id) {
    console.log('http://137.184.146.80:8080/hanlbs/api/FlashSaleProductsByFlashSaleID/' + id);

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/FlashSaleProductsByFlashSaleID/' + id);
  }


  getFlashSaleProductsByCategoryId(id) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/FlashSaleProductsbyMasterCategory/' + id);
  }
  getTopRatedProductsByCategoryId(id) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/TopRatedProductsbyMasterCategory/' + id);
  }

  DeleteSubCategory(id, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.delete('http://137.184.146.80:8080/hanlbs/DeleteSubCategory/' + id, { headers: headers });
  }


  editSubCategory(id, body, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.put('http://137.184.146.80:8080/hanlbs/updteSubCategory/' + id, body, { headers: headers });
  }



  // cart

  getCartItems(userId) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/cart/customer/' + userId + "/cart");
  }


  addProductToCart(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.post('http://137.184.146.80:8080/hanlbs/cart/addTocart', data, { headers: headers });
  }


  addProductToWhishlist(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.post('http://137.184.146.80:8080/hanlbs/api/addWishList', data, { headers: headers });
  }


  updateCartItem(customerId, productId, data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.put('http://137.184.146.80:8080/hanlbs/cart/customer/' + customerId + '/cart/update/' + productId, data, { headers: headers });
  }


  //http://137.184.146.80:8080/hanlbs/cart/customer/11111/cart/update/11111

  deleteProductFromCart(userId, productId, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.delete('http://137.184.146.80:8080/hanlbs/cart/customer/' + userId + "/cart/remove/" + productId, { headers: headers });
  }

  deleteProductFromWhishlist(userId, productId, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
    return this.http.delete('http://137.184.146.80:8080/hanlbs/api/removeWishList/' + userId + "/" + productId, { headers: headers });
  }




  getCurrentUser(token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.get('http://137.184.146.80:8080/hanlbs/currentCustomer', { headers: headers });
  }

  editCustomer(customerID, token, data) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.post('http://137.184.146.80:8080/hanlbs/customerapi/editCustomer/' + customerID, data, { headers: headers });
  }


  getMostCommonProducts(productID, catID) {

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/mostRecomended/' + productID + "/" + catID);
  }


  getCountriesList() {
    // const headers = new HttpHeaders({
    //   'Accept': 'application/json',
    //   'api-token': token,
    //   "user-email": "salah_sayed_ibrahim@yahoo.com"

    // })

    return this.http.get('http://countriesnow.space/api/v0.1/countries');
  }

  addReviewForProduct(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.post('http://137.184.146.80:8080/hanlbs/api/addReviw', data, { headers: headers });
  }


  addOrder(data, token, orderType) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.post('http://137.184.146.80:8080/hanlbs/orderApi/addorder/' + orderType, data, { headers: headers });
  }

  addOrderCash(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.post('http://137.184.146.80:8080/hanlbs/orderApi/addCashOnDeliveryOrder' , data, { headers: headers });
  }
  addOrderPaymentGateway(data, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })
console.log('http://137.184.146.80:8080/hanlbs/orderApi/addPaymentOrder');

    return this.http.post('http://137.184.146.80:8080/hanlbs/orderApi/addPaymentOrder' , data, { headers: headers });
  }

  checkPaymentStatus(refrence, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.post('http://137.184.146.80:8080/hanlbs/orderApi/payStatus/' + refrence , {}, { headers: headers });
  }



  addShippingInfo(data, userId, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.post('http://137.184.146.80:8080/hanlbs/customerapi/addShippingInfo/' + userId, data, { headers: headers });
  }


  editShippingInfo(data, userId, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.post('http://137.184.146.80:8080/hanlbs/customerapi/editShippingInfo/' + userId, data, { headers: headers });
  }



  getAllOrders(token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.get('http://137.184.146.80:8080/hanlbs/orderApi/Orders', { headers: headers });
  }

  
  getAllSubscribtions(token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.get('http://137.184.146.80:8080/hanlbs/api/allSubscriptions', { headers: headers });
  }

  updateOrderStatus(orderId,status, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    })

    return this.http.post('http://137.184.146.80:8080/hanlbs/orderApi/updateOrderStatus/' + orderId + "/" + status , {}, { headers: headers });
  }




  subscripeNewsletter(data) {

    return this.http.post('http://137.184.146.80:8080/hanlbs/api/addsubscription' , data);
  }







  // retrieve one profile data
  getOneProfileData(profileID: string, customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/" + profileID, { headers: headers });
  }


  // get profile invoice

  getOneProfileInvoice(profileID: string, customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/invoice/" + profileID, { headers: headers });
  }


  // update user profile
  updateUserProfile(data, profileID: string, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "profile/" + profileID, data, { headers: headers });
  }
  resetPassword(data, customerType: string, X_Request_ID: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID
    })
    return this.http.post(this.baseUrl + "restPassword", data, { headers: headers });
  }
  resetPasswordInProfile(data, customerType: string, X_Request_ID: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID
    })
    return this.http.put(this.baseUrl + "profile/update/password", data, { headers: headers });
  }
  isLoggedIn() {
    if (localStorage.getItem("token")) {
      // console.log("---------------- safe route ");

      return true;
    }
    else if (localStorage.getItem("auth")) {
      return false;
    }
    else {
      // console.log("---------------- un safe route ");
      return false;
    }
  }
  isPatner() {
    const loggedUser = localStorage.getItem("sessionUserType");
    if (loggedUser == "partner") {
      return true;

    }


    else {
      return false;

    }
  }

  isClient() {
    const loggedUser = localStorage.getItem("sessionUserType");
    if (loggedUser == "client") {
      return true;

    }


    else {
      return false;

    }
  }


  // get balance
  getBalance(profileId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/balance/" + profileId, { headers: headers });

  }


  getBalanceDetails(profileId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/balance/details/" + profileId, { headers: headers });

  }



  // add Rating
  addRating(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "profile/rate", data, { headers: headers });
  }

  // get Rating
  getRating(profileId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/rate/" + profileId, { headers: headers });

  }


  // add Comment
  addComment(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "comment", data, { headers: headers });
  }



  // get Comment
  getComment(jobId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "comment/" + jobId, { headers: headers });
  }

  // get profile messages
  // http://www.tazweedservice.ml/rest/api/v1/admin/message/:profileId
  getProfileMessages(profileId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/messages/" + profileId, { headers: headers });
    ///messages/{profileId}
  }


  getAllMessagesFromSpecificProfile(profileId, fromId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/message/" + profileId + "?fromId=" + fromId);
    return this.http.get(this.baseUrl + "admin/message/" + profileId + "?fromId=" + fromId, { headers: headers });


  }

  ///message/{profileId}

  /* admin part ===============
  ============================== */

  // add country

  addCountry(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "admin/config/country", data, { headers: headers });
  }

  editCountry(countryId: string, data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/config/country/" + countryId);

    return this.http.put(this.baseUrl + "admin/config/country/" + countryId, data, { headers: headers });


  }


  deleteCountry(countryId: string, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.delete(this.baseUrl + "admin/config/country/" + countryId, { headers: headers });
  }

  // get statistics
  getStatistics(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/statistics", { headers: headers });
  }


  // get all partners
  getAllPartners(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/profile?customerType=partner", { headers: headers });
  }

  // get all clients
  getAllClients(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/profile?customerType=client", { headers: headers });
  }

  // get all tax invoice
  getAllTax(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "taxInvoiceInfo", { headers: headers });
  }
  // add tax invoice
  addTax(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "taxInvoiceInfo", data, { headers: headers });
  }


  // edit tax invoice
  editTax(data, customerType: string, X_Request_ID: string, token, taxId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "taxInvoiceInfo/" + taxId, data, { headers: headers });
  }



  ///taxInvoiceInfo/{_id}



  // updata profile by admin

  // updata profile
  updateProfileByAdmin(profileId, newStatus, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "admin/profile/" + profileId, newStatus, { headers: headers });
  }


  // send message to user

  sendMessageToUser(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "admin/message", data, { headers: headers });
  }



  // send message to category

  sendMessageToCategory(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "admin/message", data, { headers: headers });
  }


  // get all messages sent by admin

  getAllAdminMessages(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/message", { headers: headers });
  }


  // get unpaid Balance

  // http://www.tazweedservice.ml/rest/api/v1/promoCodes
  getUnpaidBalance(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/unpaid/balance", { headers: headers });
  }
  // update unpaid Balance
  updateUnpaidBalance(data, partnerId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "admin/balance/" + partnerId, data, { headers: headers });
  }


  // get expired jobs

  getExpiredJobs(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/job/expired", { headers: headers });
  }


  // update unpaid Balance
  updateMessage(messageId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "admin/update/message/" + messageId, { "read": true }, { headers: headers });
  }


  // add visit 
  //customerType: string, X_Request_ID: string, token
  addVisit() {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'X-Customer-Type': customerType,
    //   'X-Request-ID': X_Request_ID,
    //   'auth': token

    // })
    return this.http.post(this.baseUrl + "visitors/increment", {});

    //{ headers: headers }
  }

  signOut(customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/signout/token", { headers: headers });

  }

  getJobTypes(customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "jobType", { headers: headers });

  }



  // promo code by admin

  // Add promo code
  addPromocode(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "promoCodes", data, { headers: headers });
  }

  getAllPromocodes(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "promoCodes", { headers: headers });
  }

  getOnePromocode(promoCodeId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "promoCodes/" + promoCodeId);

    return this.http.get(this.baseUrl + "promoCodes/" + promoCodeId, { headers: headers });
  }

  getPromocodeStatistics(promoCodeId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "statistics/promocode/" + promoCodeId);

    return this.http.get(this.baseUrl + "statistics/promocode/" + promoCodeId, { headers: headers });
  }


  checkPromoCodeValidity(code, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "promoCodes/check/" + code, { headers: headers });
  }

  checkPromoCodeValidityInProject(code, customerType: string, X_Request_ID: string, token, X_Job_Type, x_user_email) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token,
      'X-Job-Type': X_Job_Type,
      'x-user-email': x_user_email

    })
    // console.log(this.baseUrl + "promoCodes/job/check/" + code);

    return this.http.get(this.baseUrl + "promoCodes/job/check/" + code, { headers: headers });
  }


  UpdatePromocode(promoCodeId, data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "promoCode/" + promoCodeId, data, { headers: headers });
  }


  deketePromocode(promoCodeId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.delete(this.baseUrl + "promoCode/" + promoCodeId, { headers: headers });
  }


  getProfilePromoCodes(userEmail, customerType: string, X_Request_ID: string, token) {
    // console.log(this.baseUrl + "profile/promoCodes/" + userEmail);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/promoCodes/" + userEmail, { headers: headers });
  }


  getOneProject(projectId, customerType: string, X_Request_ID: string, token, x_user_email) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token,
      'X-User-Email': x_user_email

    })
    console.log(this.baseUrl + "job/profile/" + projectId);

    return this.http.get(this.baseUrl + "job/profile/" + projectId, { headers: headers });
  }


  getCountries() {
    return this.http.get("http://restcountries.eu/rest/v2/all");
  }


  getPartnerBalanceHistory(partnerId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/balance/" + partnerId);

    return this.http.get(this.baseUrl + "admin/balance/" + partnerId, { headers: headers });
  }



  getAllAdminsProfile(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    // console.log(this.baseUrl + "admin/profile");

    return this.http.get(this.baseUrl + "admin/profile?customerType=admin", { headers: headers });
  }



  deleteUserProfile(profileId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.delete(this.baseUrl + "profile/" + profileId, { headers: headers });
  }

  //http://www.tazweedservice.ml/rest/api/v1/profile/:_id



  getTime() {
    // console.log(this.baseUrl + "currentTime/");

    return this.http.get(this.baseUrl + "currentTime/");
  }


  getCountriesPublic() {
    // console.log(this.baseUrl + "countries");

    return this.http.get(this.baseUrl + "admin/config/country");


  }



  // Credit Balance Part

  addCreditBalance(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "profile/client/balance", data, { headers: headers });
  }
  getClientCreditBalance(clientId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.get(this.baseUrl + "profile/client/balance/" + clientId, { headers: headers });
  }



  /* Admin Balance Part */


  generateOtp(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    // console.log(this.baseUrl + "admin/balance/otp");

    return this.http.post(this.baseUrl + "admin/balance/otp", data, { headers: headers });
  }

  addBalanceToClientByAdmin(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/profile/balance");

    return this.http.post(this.baseUrl + "admin/profile/balance", data, { headers: headers });
  }



  getSingleBill(jobId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    //profile/invoice/job/:jobId
    console.log(this.baseUrl + "profile/invoice/job/" + jobId);


    return this.http.get(this.baseUrl + "profile/invoice/job/" + jobId, { headers: headers });
  }



  generateBillsByDuration(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/invoices");

    return this.http.post(this.baseUrl + "admin/invoices", data, { headers: headers });
  }





  getOneProjectActivityLog(projectId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token,

    })

    return this.http.get(this.baseUrl + "activityLog/job/" + projectId, { headers: headers });
  }



  // cart




}
