import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faMugHot, faEnvelope, faInfinity, faLightbulb, faRocket, faImage } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-flash-sale-products',
  templateUrl: './flash-sale-products.component.html',
  styleUrls: ['./flash-sale-products.component.css']
})
export class FlashSaleProductsComponent implements OnInit {
  allProducts;
  showloader = false;
  adminToken;
  faImage = faImage;
  flashMode = false;
  selectedFlashSale;
  productToAdd;
  addproductSuccess = false;
  addproductFail = false;



  selectedFlashSale2 = 0;

  removeFlashMode = false;
  productToRemove;
  removePoductSuccess = false;
  removePoductFail = false;
  allFlashSales;
  allFlashSaleProducts;
  constructor(private route: Router, private userServ: UserService) { }

  ngOnInit(): void {
    this.adminToken = localStorage.getItem("auth")
    this.getAllFlashSales()

    this.getProducts()
  }

  getProducts() {


    this.userServ.getAllProductsOutFlashSale().subscribe(
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


  getFlashSaleProducts() {


    this.userServ.getAllProductsByFlashSaleId(this.selectedFlashSale2).subscribe(
      (response: any) => {
        //  console.log(response);

        this.allFlashSaleProducts = response.flashSaleProducts;
        console.log(this.allFlashSaleProducts);

      },
      err => {
        console.log(err);



      }
    )
  }

  getAllFlashSales() {


    this.userServ.getAllFlashSales().subscribe(
      (response: any) => {
        console.log(response);
        this.allFlashSales = response


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }


  openFlashSalseDialog(product) {
    this.flashMode = true;
    this.addproductSuccess = false;
    this.addproductFail = false;
    this.productToAdd = product;

  }


  closeFlashSalseDialog() {
    this.flashMode = false;
    this.addproductSuccess = false;
    this.addproductFail = false;
    this.productToAdd = null;

  }


  AddToFlashSale() {
    this.showloader = true;
    console.log(this.productToAdd.id);
    console.log(this.selectedFlashSale);


    this.userServ.addProductToFlashSale(this.selectedFlashSale, this.productToAdd.id, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        console.log(response);
        this.addproductSuccess = true;
        setTimeout(() => {
          this.getProducts()
          this.flashMode = false;
          this.addproductSuccess = false;

        }, 2000);


      },
      err => {
        this.showloader = false;
        this.addproductFail = true;
        console.log(err);



      }
    )

  }


  openRemoveFlashSalseDialog(product) {
    this.removeFlashMode = true;
    this.removePoductSuccess = false;
    this.removePoductFail = false;
    this.productToRemove = product;

  }


  closeRemoveFlashSalseDialog() {
    this.removeFlashMode = false;
    this.removePoductSuccess = false;
    this.removePoductFail = false;
    this.productToRemove = null;

  }



  removeFromFlashSale() {
    this.showloader = true;
    console.log(this.productToRemove.id);


    this.userServ.deleteProductFromFlashSale(this.productToRemove.id, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        console.log(response);
        this.removePoductSuccess = true;
        setTimeout(() => {
          this.getFlashSaleProducts()
          this.removeFlashMode = false;
          this.removePoductSuccess = false;

        }, 2000);


      },
      err => {
        this.showloader = false;
        this.removePoductFail = true;
        console.log(err);



      }
    )

  }



}
