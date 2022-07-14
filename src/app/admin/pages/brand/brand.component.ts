import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { faChevronLeft, faChevronRight, faWallet, faEdit, faTrashAlt, faFolderOpen, faCheckCircle, faSignOutAlt, faTimes, faFileAlt, faCube, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  allBrands;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  addBrandForm: FormGroup;
  editBrandForm: FormGroup;
  faFolderOpen = faFolderOpen;
  addSuccess = false;
  addFail = false;
  showloader = false;
  adminToken;
  editBrandMode = false;
  brandToEdit;
  editSuccess = false;
  editFail = false;
  constructor(private userServ: UserService, private formBuilder: FormBuilder, private route: Router, private sanitizer: DomSanitizer, private uploadServ: UploadFileService) { }

  ngOnInit(): void {
    this.adminToken = localStorage.getItem("auth")
    this.addBrandForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      base64Master: new FormControl(null),
      sKUCode: new FormControl(null),


    });
    this.editBrandForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      base64Master: new FormControl(null),
      id: new FormControl(null),
      sKUCode: new FormControl(null),


    });
    this.getAllBrands()
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
  addBrand() {
    if (this.addBrandForm.get("base64Master").value == null) {
      alert("select Brand Image")
    }
    else {
      console.log(this.addBrandForm.value);
      this.addFail = false;
      this.addSuccess = false;
      this.showloader = true;


      this.userServ.addBrand(this.addBrandForm.value, this.adminToken).subscribe(
        (response: any) => {
          this.showloader = false;
          console.log(response);

          this.addSuccess = true;
          this.addBrandForm.reset()
          this.getAllBrands()
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


  openEditDialog(brand) {
    this.editSuccess = false;
    this.editFail = false;
    this.editBrandMode = true;
    this.brandToEdit = brand;

    this.editBrandForm.get("name").setValue(this.brandToEdit.name)
    this.editBrandForm.get("base64Master").setValue(this.brandToEdit.base64Master)
    this.editBrandForm.get("id").setValue(this.brandToEdit.id)
    this.editBrandForm.get("sKUCode").setValue(this.brandToEdit.sKUCode)



  }

  closeEditDialog() {
    this.editBrandMode = false;
    this.brandToEdit = null;
    this.editSuccess = false;
    this.editFail = false;

  }

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {

        const imageBase = upData.split(',')[1];
        // console.log(imageBase);
        this.addBrandForm.get("base64Master").setValue(imageBase)



      }
    )
  }


  onChange4($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {

        const imageBase = upData.split(',')[1];
        // console.log(imageBase);
        this.editBrandForm.get("base64Master").setValue(imageBase)



      }
    )
  }
  editBrand(){


    this.showloader = true;
    console.log(this.editBrandForm.value);
    this.userServ.editBrand(this.editBrandForm.value, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        this.editSuccess = true;

      },
      err => {
        this.showloader = false;
        this.editFail = true;
        console.log(err);



      }
    )

    
  }


}
