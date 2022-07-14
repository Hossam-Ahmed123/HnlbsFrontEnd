import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  showloader = true;
  allOrders;
  noProductDetails = false;
  detailsMode = false;
  productToShow;
  selectedOrderDetailsObj;
  orderPerson;
  showPersonRow = false;
  constructor(private userServ: UserService, private route: Router) { }

  ngOnInit(): void {

    this.getAllOrders()
  }

  getAllOrders(){

    this.userServ.getAllOrders(localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log(response);
        this.showloader = false;
        this.allOrders = response


      },
      err => {
        this.showloader = false;
        console.log(err);



      }
    )

  }

  openDetailsDialog(product) {
    this.noProductDetails = false;
    this.detailsMode = true;
    this.productToShow = product;
    this.getOrderDetails(this.productToShow.orderKey)




  }
  closeDetailsDialog() {
    this.noProductDetails = false;
    this.detailsMode = false;
    this.productToShow = null;
    this.selectedOrderDetailsObj = null
    this.showPersonRow = false;
    this.orderPerson = null;


  }

  getOrderDetails(orderKey) {

    this.userServ.getOrderDetails(orderKey, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log(response);
        if(response== null || response.length ==0){
          this.noProductDetails = true;
        }
        else{
          this.selectedOrderDetailsObj = response;
        }

       



      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }



  getOrderPerson() {

    this.userServ.getOrderPersonInAdmin(this.productToShow.orderKey, localStorage.getItem("auth")).subscribe(
      (response: any) => {
console.log(response);

     this.orderPerson = response;
     this.showPersonRow = true;

       



      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }

  //this.productToShow.orderKey

}
