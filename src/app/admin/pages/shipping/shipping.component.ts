import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { faChevronLeft, faChevronRight, faWallet, faEdit, faTrashAlt, faFolderOpen, faCheckCircle, faSignOutAlt, faTimes, faFileAlt, faCube, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  allBrands;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  addShippingForm: FormGroup;
  countriesList;
  allShippingFees;
  SelectedCountryIndex;
  filteredCities;
  editBrandMode = false;
  shippingToEdit;
  editSuccess = false;
  editFail = false;

  editShippingForm: FormGroup;
  faFolderOpen = faFolderOpen;
  addSuccess = false;
  addFail = false;
  showloader = false;
  adminToken;
  
  constructor(private userServ: UserService, private formBuilder: FormBuilder, private route: Router, private sanitizer: DomSanitizer, private uploadServ: UploadFileService) { }

  ngOnInit(): void {
    this.adminToken = localStorage.getItem("auth")
    this.addShippingForm = new FormGroup({
      city: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required)


    });
    this.editShippingForm = new FormGroup({
      id: new FormControl(null),
      city: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required)


    });
    this.getCountriesList()
    this.getAllShippingFees()
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


  getAllShippingFees() {


    this.userServ.getAllShippingFees(localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log(response);
        this.allShippingFees = response


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


  addShipping() {

    if (this.addShippingForm.get("city").value == null) {
      alert("select city")
    }
    else {

      console.log(this.addShippingForm.value);
      this.addFail = false;
      this.addSuccess = false;
      this.showloader = true;


      this.userServ.addShippingFees(this.addShippingForm.value, this.adminToken).subscribe(
        (response: any) => {
          this.showloader = false;
          console.log(response);

          this.addSuccess = true;
          this.addShippingForm.reset()
          this.getAllShippingFees()
          this.addSuccess = false;
        },
        err => {
          this.showloader = false;
          this.addFail = true;
          console.log(err);



        }
      )

    }




  }


  logCountryEdit() {
    console.log(this.SelectedCountryIndex);
    this.filteredCities = this.countriesList[this.SelectedCountryIndex].cities

  }

  openEditDialog(shipping) {
    this.editSuccess = false;
    this.editFail = false;
    this.editBrandMode = true;
    this.shippingToEdit = shipping;

    this.editShippingForm.get("value").setValue(this.shippingToEdit.value)
    this.editShippingForm.get("city").setValue(this.shippingToEdit.city)
    this.editShippingForm.get("id").setValue(this.shippingToEdit.id)
    
  



  }

  closeEditDialog() {
    this.editBrandMode = false;
    this.shippingToEdit = null;
    this.editSuccess = false;
    this.editFail = false;

  }





  editShipping() {


    this.showloader = true;
    console.log(this.editShippingForm.value);

    //(data,id, token)
    this.userServ.editShippingFees(this.editShippingForm.value,this.shippingToEdit.id, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        this.editSuccess = true;
this.getAllShippingFees()
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


  

}
