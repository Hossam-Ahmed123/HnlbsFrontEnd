import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { faPercentage, faBuilding, faCheckCircle, faFilePdf, faEye, faCopy, faLightbulb, faUserEdit, faBriefcase, faGlobeAfrica, faBirthdayCake, faPhone, faVenusMars, faSignOutAlt, faUserAlt, faTable, faLock, faArchive, faStar, faImage, faLocationArrow, faTruck, faList } from '@fortawesome/free-solid-svg-icons';
import { user } from '../Model/user';
import { ManageImageService } from '../services/manage-image.service';
import { ManageProjectService } from '../services/manage-project.service';
import { UploadFileService } from '../services/upload-file.service';
import { UserService } from '../services/user.service';
import { UUIDService } from '../services/uuid.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  faLocationArrow = faLocationArrow;
  faCopy = faCopy;
  faEye = faEye;
  faTruck = faTruck;
  faList = faList;
  faPercentage = faPercentage;
  showEditMode = false;
  faUserEdit = faUserEdit;
  faBuilding = faBuilding;
  faFilePdf = faFilePdf;
  faLightbulb = faLightbulb;
  faCheckCircle = faCheckCircle;
  faBriefcase = faBriefcase;
  faGlobeAfrica = faGlobeAfrica;
  faBirthdayCake = faBirthdayCake;
  showClipMessage = false;
  faPhone = faPhone;
  faVenusMars = faVenusMars;
  math = Math;
  active = 1;
  faSignOutAlt = faSignOutAlt;
  faUserAlt = faUserAlt;
  faTable = faTable;
  faLock = faLock;
  faArchive = faArchive;
  faStar = faStar;
  faImage = faImage;


  showLoader = false;

  allUserData;

  addShippingInfoForm: FormGroup;
  editShippingInfoForm: FormGroup;
  addReviewForm: FormGroup;
  addShippingMode = false;

  editMode = false;
  shippingToEdit;
  editSuccess = false;
  editFail = false;
  SelectedCountryIndex;
  countriesList: any;
  filteredCities: any;
  allPromoCodes;
  myOrders;
  detailsMode = false;
  productToShow;
  selectedOrderDetailsObj;
  noProductDetails = false;
  reviewMode = false;
  productToReview;
  reviewSuccess = false;
  reviewFail = false;
  constructor(
    private route: Router,
    private userServ: UserService,
    private uploadServ: UploadFileService
  ) { }

  ngOnInit(): void {

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
    this.addReviewForm = new FormGroup({
      content: new FormControl(null),
      base64Master: new FormControl(null),
      customerrId: new FormControl(null),
      productId: new FormControl(null),
      rating: new FormControl(null,Validators.required),
      reviewImage: new FormControl(null),
      title: new FormControl(null),
      customerName: new FormControl(null),
    });
    this.showLoader = false;
    this.getCountriesList()
    this.getUserData()
    this.getCustomerOrders()
    // this.getOrderDetails()


















  }


  getUserData() {

    this.userServ.getCurrentUser(localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        this.allUserData = response;
        this.allPromoCodes = response.promoCode;
        localStorage.setItem("loggedUserName",this.allUserData.name)
        // this.myOrders = response.orderDetails;




      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }

  getCustomerOrders() {

    this.userServ.getCustomerOrders(localStorage.getItem("loggedUserId"), localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        this.myOrders = response;




      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }


  getOrderDetails(orderKey) {

    this.userServ.getOrderDetails(orderKey, localStorage.getItem("token")).subscribe(
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



  signOut() {
    this.route.navigate(["/login"]);
    localStorage.clear();
  }



  openEditProfile() {
    this.route.navigate(["/editProfile/" + localStorage.getItem("loggedUserId")]);

  }



  openAddSHipping() {

    this.addShippingMode = true
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


      },
      err => {
        this.showLoader = false;
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


  openEditShipping() {
    this.editMode = true;
    this.editSuccess = false;
    this.editFail = false;
    // this.shippingToEdit = shipping;
    this.editShippingInfoForm.get("id").setValue(this.allUserData?.shipping?.id)
    this.editShippingInfoForm.get("shippingAddress").setValue(this.allUserData?.shipping?.shippingAddress)
    this.editShippingInfoForm.get("shippingCity").setValue(this.allUserData?.shipping?.shippingCity)
    this.editShippingInfoForm.get("shippingContury").setValue(this.allUserData?.shipping?.shippingContury)
    this.editShippingInfoForm.get("shippingName").setValue(this.allUserData?.shipping?.shippingName)
    // this.editShippingInfoForm.get("shippingType").setValue(this.allUserData?.shipping?.shippingType)
    this.logCountryEdit()


  }

  closeEditShipping() {
    this.editMode = false;
    this.editSuccess = false;
    this.editFail = false;
    this.shippingToEdit = null;


  }

  editShipping() {
    this.editSuccess = false;
    this.editFail = false;
    this.editShippingInfoForm.get("shippingContury").setValue(
      this.countriesList[this.SelectedCountryIndex].country
    )
    console.log(this.editShippingInfoForm.value);


    this.showLoader = true;
    this.userServ.editShippingInfo(this.editShippingInfoForm.value, this.allUserData.shipping.id, localStorage.getItem("token")).subscribe(
      (response: any) => {
        this.showLoader = false;
        console.log(response);
        this.editSuccess = true;

        setTimeout(() => {

          this.editMode = false;
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

  logCountry() {

    // alert("country index is == " + this.addShippingInfoForm.get("shippingContury").value)

    this.SelectedCountryIndex = this.addShippingInfoForm.get("shippingContury").value;
    //  this.addShippingInfoForm.get("shippingContury").setValue(
    //    this.countriesList[SelectedCountryIndex].country
    //  )


    //  console.log(this.addShippingInfoForm.get("shippingContury").value);

    this.filteredCities = this.countriesList[this.SelectedCountryIndex].cities

  }




  logCountryEdit() {

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


    this.SelectedCountryIndex = this.countriesList.findIndex(x => x.country === this.editShippingInfoForm.get("shippingContury").value);

    console.log(this.SelectedCountryIndex);

    //  this.addShippingInfoForm.get("shippingContury").setValue(
    //    this.countriesList[SelectedCountryIndex].country
    //  )


    //  console.log(this.addShippingInfoForm.get("shippingContury").value);

    this.filteredCities = this.countriesList[this.SelectedCountryIndex].cities

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


  }

  openReviewDialog(product){
    this.reviewFail = false;
    this.reviewSuccess = false;
    this.reviewMode = true;
    this.productToReview = product;
    this.addReviewForm.get("productId").setValue(this.productToReview.product.id)
    this.addReviewForm.get("customerName").setValue(localStorage.getItem("loggedUserName"))
    this.addReviewForm.get("customerrId").setValue(localStorage.getItem("loggedUserId"))
    console.log(localStorage.getItem("loggedUserId"));
    
    
    /*this.addReviewForm = new FormGroup({
      reviewImage: new FormControl(null),
    });*/

  }
  closeReviewDialog(){
    this.reviewFail = false;
    this.reviewSuccess = false;
    this.reviewMode = false;
    this.productToReview = null;

  }

  addReview() {
    this.reviewFail = false;
    this.reviewSuccess = false;
    this.showLoader = true;
    console.log(this.addReviewForm.value);
    
    this.userServ.addReviewForProduct(this.addReviewForm.value,localStorage.getItem("token")).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.reviewMode = false;
        this.productToReview = null


      },
      err => {
        this.showLoader = false;
        console.log(err);



      }
    )



  }

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {

        const imageBase = upData.split(',')[1];
        // console.log(imageBase);
        this.addReviewForm.get("base64Master").setValue(imageBase)



      }
    )
  }


}
