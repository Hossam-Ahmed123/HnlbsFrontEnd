import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { faCoffee, faMugHot, faEnvelope, faInfinity, faLightbulb, faRocket, faCalendar,faEdit, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-details-for-admin',
  templateUrl: './product-details-for-admin.component.html',
  styleUrls: ['./product-details-for-admin.component.css']
})
export class ProductDetailsForAdminComponent implements OnInit {
  projectIdShoot;
  childCategoryID;
  productDetails;
  faCalendar = faCalendar;
  faEdit = faEdit;
  faMoneyBill = faMoneyBill;
  childImages;
  activeSliderId;
  showLoader = true;
  cartitems = []
  loggedUser;
  showLoggedData = false;
  onlineMode = false;
  mostCommonProducts;
  editProductSizeForm: FormGroup;
  showRatingDialog = false;
  currentRate = 0;
  editMode = false;
  sizeToEdit;
  editSuccess = false;
  editFail = false;
  adminToken;

  constructor(private userServ: UserService, private actroute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.adminToken = localStorage.getItem("auth");
    this.editProductSizeForm = new FormGroup({


      bust: new FormControl(null, Validators.required),
      length: new FormControl(null),
      quantity: new FormControl(null, Validators.required),
      shoulder: new FormControl(null,Validators.required),
      size: new FormControl(null),
      sleevelength: new FormControl(null, Validators.required),
      sKUCode: new FormControl(null),




      
    })
    this.projectIdShoot = this.actroute.snapshot.params["id"];
    console.log(this.projectIdShoot);
    this.userServ.getProductDetails(this.projectIdShoot).subscribe(
      (response: any) => {
        console.log(response);
        this.productDetails = response
        this.childImages = response.childImages;
        this.childCategoryID = response.category.categoryId;
        // alert(this.childCategoryID)
        this.showLoader = false;

        // this.allProducts = response;
      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )

  }


  openEditDialog(Massize){
    this.editMode = true;
    this.sizeToEdit = Massize;
    this.editFail = false;
    this.editSuccess = false;
    this.editProductSizeForm.get("bust").setValue(Massize.bust)
    this.editProductSizeForm.get("length").setValue(Massize.length)
    this.editProductSizeForm.get("quantity").setValue(Massize.quantity)
    this.editProductSizeForm.get("shoulder").setValue(Massize.shoulder)
    this.editProductSizeForm.get("size").setValue(Massize.size)
    this.editProductSizeForm.get("sleevelength").setValue(Massize.sleevelength)
    this.editProductSizeForm.get("sKUCode").setValue(Massize.sKUCode)
    


  }

  closeEditDialog(){
    this.editMode = false;
    this.sizeToEdit = null;


  }

  editProductSize(){
    this.editFail = false;
    this.editSuccess = false;
    console.log(this.editProductSizeForm.value);

//sizeId, data, token
    this.userServ.editProductSize(this.sizeToEdit.id,this.editProductSizeForm.value, this.adminToken).subscribe(
      (response: any) => {
        this.showLoader = false;

        this.editSuccess = true;
        this.editProductSizeForm.reset()
        setTimeout(() => {
          this.editMode = false;
          this.editSuccess = false;
          // this.ngOnInit()
          this.userServ.getProductDetails(this.projectIdShoot).subscribe(
            (response: any) => {
              console.log(response);
              this.productDetails = response
              this.childImages = response.childImages;
              this.childCategoryID = response.category.categoryId;
              // alert(this.childCategoryID)
              this.showLoader = false;
      
              // this.allProducts = response;
            },
            err => {
              this.showLoader = false;
              console.log(err);
      
      
      
            }
          )
          
        }, 1000);
    
      },
      err => {
        this.showLoader = false;
        this.editFail = true;
        console.log(err);



      }
    )
    

  }

}
