import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { faChevronLeft, faChevronRight, faWallet, faEdit, faTrashAlt, faFolderOpen, faCheckCircle, faSignOutAlt, faTimes, faFileAlt, faCube, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
@Component({
  selector: 'app-promo-codes',
  templateUrl: './promo-codes.component.html',
  styleUrls: ['./promo-codes.component.css']
})
export class PromoCodesComponent implements OnInit {

  allBrands;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  addPromoCodeForm: FormGroup;
  editPromoCodeForm: FormGroup;
  allPromoCodes;
  allUsers;
  countriesList;
  allShippingFees;
  SelectedCountryIndex;
  filteredCities;
  editBrandMode = false;
  shippingToEdit;
  editSuccess = false;
  editFail = false;
  promoToDelete;
  deleteMode = false;
  editShippingForm: FormGroup;
  faFolderOpen = faFolderOpen;
  addSuccess = false;
  addFail = false;
  showloader = false;
  adminToken;
  deleteFail = false;
  selectedUserId;
  selectedPromoCodeId;
  assignSuccess = false;
  constructor(private userServ: UserService, private formBuilder: FormBuilder, private route: Router, private sanitizer: DomSanitizer, private uploadServ: UploadFileService) { }

  ngOnInit(): void {
    this.adminToken = localStorage.getItem("auth")
    this.addPromoCodeForm = new FormGroup({
      discountType: new FormControl(null, Validators.required),
      discountValue: new FormControl(null, Validators.required),
      numUsed: new FormControl(null, Validators.required),
      promoName: new FormControl(null, Validators.required),
      promoType: new FormControl(null, Validators.required),

    });

    this.editPromoCodeForm = new FormGroup({
      discountType: new FormControl(null, Validators.required),
      discountValue: new FormControl(null, Validators.required),
      numUsed: new FormControl(null, Validators.required),
      promoName: new FormControl(null, Validators.required),
      promoType: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required),
    });


    this.editShippingForm = new FormGroup({
      id: new FormControl(null),
      city: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required)


    });
    this.getCountriesList()
    this.getAllPromoCodes()
    this.getAllUsers()
    // this.getAllBrands()
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


  getAllPromoCodes() {


    this.userServ.getAllPromoCodesLast(localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log(response);
        this.allPromoCodes = response


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }


  
  getAllUsers() {


    this.userServ.getAllUsers(localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log(response);
        this.allUsers = response


      },
      err => {
        // this.showLoader = false;
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


  addPromoCode() {


    console.log(this.addPromoCodeForm.value);
    this.addFail = false;
    this.addSuccess = false;
    this.showloader = true;


    this.userServ.addPromoCodeLast(this.addPromoCodeForm.value, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        console.log(response);

        this.addSuccess = true;
        this.addPromoCodeForm.reset()
        this.getAllPromoCodes()
        this.addSuccess = false;
      },
      err => {
        this.showloader = false;
        this.addFail = true;
        console.log(err);



      }
    )






  }


  logCountryEdit() {
    console.log(this.SelectedCountryIndex);
    this.filteredCities = this.countriesList[this.SelectedCountryIndex].cities

  }

  openEditDialog(promo) {
    this.editSuccess = false;
    this.editFail = false;
    this.editBrandMode = true;
    this.shippingToEdit = promo;
    console.log(this.shippingToEdit);

    this.editPromoCodeForm.get("id").setValue(this.shippingToEdit.id)
    this.editPromoCodeForm.get("discountType").setValue(this.shippingToEdit.discountType)
    this.editPromoCodeForm.get("discountValue").setValue(this.shippingToEdit.discountValue)
    this.editPromoCodeForm.get("numUsed").setValue(this.shippingToEdit.numUsed)
    this.editPromoCodeForm.get("promoName").setValue(this.shippingToEdit.promoName)
    this.editPromoCodeForm.get("promoType").setValue(this.shippingToEdit.promoType)





  }

  closeEditDialog() {
    this.editBrandMode = false;
    this.shippingToEdit = null;
    this.editSuccess = false;
    this.editFail = false;

  }



  editPromoCode() {


    this.showloader = true;
    console.log(this.editPromoCodeForm.value);
    //(id,data, token)
    this.userServ.editPromoCodeLast(this.editPromoCodeForm.get("id").value, this.editPromoCodeForm.value, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        this.editSuccess = true;
        this.editBrandMode = false;
        this.editSuccess = false;
        this.editPromoCodeForm.reset()
        this.getAllPromoCodes()
      },
      err => {
        this.showloader = false;
        this.editFail = true;
        console.log(err);



      }
    )


  }




  editShipping() {


    this.showloader = true;
    console.log(this.editShippingForm.value);

    //(data,id, token)
    this.userServ.editShippingFees(this.editShippingForm.value, this.shippingToEdit.id, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        this.editSuccess = true;
        // this.getAllShippingFees()
        this.editBrandMode = false;
        this.editSuccess = false;
        this.editShippingForm.reset()
      },
      err => {
        this.showloader = false;
        this.editFail = true;
        console.log(err);



      }
    )


  }


  openDeletePromo(promo) {
    this.deleteMode = true;
    this.promoToDelete = promo;

  }

  closeDeletePromo() {
    this.deleteMode = false;
    this.promoToDelete = null;

  }



  deletePromocode() {


    this.showloader = true;
    this.userServ.deletePromoCodeLast(this.promoToDelete.id, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        this.deleteMode = false
        this.getAllPromoCodes()
      },
      err => {
        this.showloader = false;
        this.deleteFail = true;
        console.log(err);



      }
    )


  }



  assignPromoToUser() {
    this.assignSuccess = false;
    this.showloader = true;
    console.log(this.selectedPromoCodeId);
    console.log(this.selectedUserId);
    console.log(this.adminToken);
    

    this.userServ.asignPromoCodeToUser(this.selectedPromoCodeId,this.selectedUserId, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        console.log(response);
        this.assignSuccess = true;
      },
      err => {
        this.showloader = false;
        console.log(err);



      }
    )






  }


}
