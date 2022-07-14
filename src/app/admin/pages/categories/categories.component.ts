import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { faChevronLeft, faChevronRight, faWallet, faEdit, faFolderOpen, faTrashAlt, faImage, faCheckCircle, faSignOutAlt, faTimes, faFileAlt, faCube, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  allBrands;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faFolderOpen = faFolderOpen;
  faImage = faImage;
  addCategoryForm: FormGroup;
  editCoverForm: FormGroup;
  addSuccess = false;
  addFail = false;
  showloader = false;
  adminToken;
  allCategories;
  categoryToEdit;
  editCategoryMode = false;
  editFail = false;
  editSuccess = false;
  addCategoryMode = false;
  selectedMasterCategory = -1;
  selectedindex;
  filteredChildCategories;

  editCategoryModeLast = false;
  categoryToEditLast;
  editSuccessLast = false;
  editFailLast = false;
  editChildCategoryForm: FormGroup;

  deleteCategoryModeLast = false;
  categoryToDeleteLast;
  deleteSuccessLast = false;
  deleteFailLast = false;
  constructor(private userServ: UserService, private uploadServ: UploadFileService, private formBuilder: FormBuilder, private route: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.getAllCategories()
    this.adminToken = localStorage.getItem("auth")
    this.addCategoryForm = new FormGroup({
      parentCategoryId: new FormControl(0, Validators.required),
      name: new FormControl(null, Validators.required),
      base64cover: new FormControl(null),
      sKUCode: new FormControl(null),


    });
    this.editChildCategoryForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      base64cover: new FormControl(null),
      sKUCode: new FormControl(null),


    });
    
    this.editCoverForm = new FormGroup({
      base64cover: new FormControl(null)


    });


  }
  getAllCategories() {


    this.userServ.getAllCategories().subscribe(
      (response: any) => {
        console.log(response);
        this.allCategories = response


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }



  addCategory() {
    if (this.addCategoryForm.get("parentCategoryId").value == 0) {
      alert("please select main category")
    }
    else {

      if( this.addCategoryForm.get("base64cover").value== null){
        alert("select category image")
      }
      else{
        console.log(this.addCategoryForm.value);
        this.addFail = false;
        this.addSuccess = false;
        this.showloader = true;
        this.userServ.addCategory(this.addCategoryForm.value, this.adminToken).subscribe(
          (response: any) => {
            this.showloader = false;
            console.log(response);
  
            this.addSuccess = true;
            this.addCategoryForm.reset()
            this.addCategoryMode = false;
            // this.getAllCategories;
          },
          err => {
            this.showloader = false;
            this.addFail = true;
            console.log(err);
  
  
  
          }
        )

      }
    


     
    }



  }

  openEditDialog(cat) {
    this.editFail = false;
    this.editSuccess = false;
    this.editCategoryMode = true;
    this.categoryToEdit = cat
  }

  closeEditDialog() {
    this.editCategoryMode = false;
    this.categoryToEdit = null
    this.editFail = false;
    this.editSuccess = false;

  }


  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {

        const imageBase = upData.split(',')[1];
        // console.log(imageBase);
        this.editCoverForm.get("base64cover").setValue(imageBase)



      }
    )
  }

  editCover() {
    // this.editCoverForm.get("categoryId").setValue(this.categoryToEdit.categoryId)
    this.editFail = false;
    this.editSuccess = false;
    this.showloader = true;
    console.log(this.editCoverForm.value);
    this.userServ.updateCategoryCoverPhoto(this.categoryToEdit.categoryId, this.editCoverForm.value, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        console.log(response);

        this.editSuccess = true;
        setTimeout(() => {
          this.ngOnInit()

        }, 2000);

      },
      err => {
        this.showloader = false;
        this.editFail = true;
        console.log(err);



      }
    )



  }
  updateCategory() {

    const body = {
      name: "Tops222"
    }
    this.userServ.updateCategoryCoverPhoto("4", body, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        console.log(response);

        this.editSuccess = true;
        setTimeout(() => {
          this.ngOnInit()

        }, 2000);

      },
      err => {
        this.showloader = false;
        this.editFail = true;
        console.log(err);



      }
    )

  }


  openAddCategoryDialog() {
    this.addCategoryMode = true;
    this.addSuccess = false;
    this.addFail = false;

  }

  closeAddCategoryDialog() {
    this.addCategoryMode = false;

  }


  selectIndex(i) {
    this.selectedindex = i

  }
  getChildCategories() {
    if (this.selectedMasterCategory == -1) {
      alert("please select Master Category")
    }

    else {


      this.filteredChildCategories = this.allCategories[this.selectedMasterCategory].childrenCategories;
      console.log(this.filteredChildCategories);
    }
  }


  openDeleteDialog(cat) {
    this.deleteCategoryModeLast = true;
    this.categoryToDeleteLast = cat;

  }

  clodeDeleteDialog() {
    this.deleteCategoryModeLast = false;
    this.categoryToDeleteLast = null;

  }

  deleteCategory() {
    //id, data, token
    this.showloader = true;
    this.userServ.DeleteSubCategory(this.categoryToDeleteLast.categoryId, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        // console.log(response);
        // this.ngOnInit()
        this.getAllCategories()
        this.getChildCategories()
        this.deleteCategoryModeLast = false;
        // this.editSuccess = true;
        // setTimeout(() => {
        //   this.ngOnInit()

        // }, 2000); 

      },
      err => {
        this.showloader = false;
        this.deleteFailLast = true;
        console.log(err);



      }
    )


  }


  openEditLastDialog(cat) {
    this.editSuccessLast = false;
    this.editFailLast = false;
    this.editCategoryModeLast = true;
    this.categoryToEditLast = cat;
    this.editChildCategoryForm.get("name").setValue(this.categoryToEditLast.name)
    this.editChildCategoryForm.get("base64cover").setValue(this.categoryToEditLast.base64cover)
    this.editChildCategoryForm.get("sKUCode").setValue(this.categoryToEditLast.sKUCode)

  }

  clodeEditLastDialog() {
    this.editCategoryModeLast = false;
    this.categoryToEditLast = null;
    this.editSuccessLast = false;

  }

  editChildCategoty(){
    this.showloader = true;
    console.log(this.editChildCategoryForm.value);
    this.userServ.editSubCategory(this.categoryToEditLast.categoryId,this.editChildCategoryForm.value, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;
        // console.log(response);
        this.editSuccessLast = true;
        // this.ngOnInit()
        // this.getAllCategories()
        // this.getChildCategories()
        
        // this.editSuccess = true;
        // setTimeout(() => {
        //   this.ngOnInit()

        // }, 2000); 

      },
      err => {
        this.showloader = false;
        this.editFailLast = true;
        console.log(err);



      }
    )

    //  editSubCategory(id,body, token) 
    
  }



  onChange2($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {

        const imageBase = upData.split(',')[1];
        // console.log(imageBase);
        this.addCategoryForm.get("base64cover").setValue(imageBase)



      }
    )
  }

  onChange3($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {

        const imageBase = upData.split(',')[1];
        // console.log(imageBase);
        this.editChildCategoryForm.get("base64cover").setValue(imageBase)



      }
    )
  }



}
