import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { faChevronLeft, faChevronRight, faWallet, faEdit, faFolderOpen, faTrashAlt, faImage, faCheckCircle, faSignOutAlt, faTimes, faFileAlt, faCube, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-flash-sale',
  templateUrl: './flash-sale.component.html',
  styleUrls: ['./flash-sale.component.css']
})
export class FlashSaleComponent implements OnInit {


  allBrands;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faImage = faImage;
  faFolderOpen = faFolderOpen;
  addFlashSaleForm: FormGroup;
  editFlashSaleForm: FormGroup;
  addSuccess = false;
  addFail = false;
  showloader = false;
  adminToken;
  allCategories;
  categoryToEdit;
  editCategoryMode = false;
  editFail = false;
  editSuccess = false;
  allFlashSales;

  deleteMode = false;
  itemToDelete;
  deleteSuccess = false;
  deleteFail = false;



  editMode = false;
  itemToedit;
  editSaleSuccess = false;
  editSaleSuccessFail = false;


  constructor(private userServ: UserService, private uploadServ: UploadFileService, private formBuilder: FormBuilder, private route: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllFlashSales()
    this.adminToken = localStorage.getItem("auth")
    this.addFlashSaleForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      discription: new FormControl(null),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),


    });

    this.editFlashSaleForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      discription: new FormControl(null),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),


    });



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



  addFlashSale() {

    console.log(this.addFlashSaleForm.value);
    this.addFail = false;
    this.addSuccess = false;
    this.showloader = true;


    this.userServ.addFlashSale(this.addFlashSaleForm.value, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;

        this.addSuccess = true;
        this.addFlashSaleForm.reset()
        this.getAllFlashSales()
        // this.getAllCategories;
      },
      err => {
        this.showloader = false;
        this.addFail = true;
        console.log(err);



      }
    )




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





  openDeleteDialog(sale) {
    this.deleteMode = true;
    this.itemToDelete = sale;

  }

  CloseDeleteDialog() {
    this.deleteMode = false;
    this.itemToDelete = null;
    this.deleteSuccess = false;
    this.editFail = false;

  }


  deleteFlashSale() {

    this.deleteFail = false;
    this.deleteSuccess = false;
    this.showloader = true;


    this.userServ.deleteFlashSale(this.itemToDelete.id, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;

        this.deleteSuccess = true;
        this.getAllFlashSales()
        this.deleteMode = false;
        // this.getAllCategories;
      },
      err => {
        this.showloader = false;
        this.deleteFail = true;
        console.log(err);



      }
    )




  }



  openEditFlashDialog(sale) {
    this.editMode = true;
    this.itemToedit = sale;
    this.editFlashSaleForm.get("name").setValue(this.itemToedit.name)
    this.editFlashSaleForm.get("discription").setValue(this.itemToedit.discription)
    this.editFlashSaleForm.get("start").setValue(this.itemToedit.start)
    this.editFlashSaleForm.get("end").setValue(this.itemToedit.end)

  }

  CloseEditFlashDialog() {
    this.editMode = false;
    this.itemToedit = null;
    this.editSaleSuccess = false;
    this.editSaleSuccessFail = false;

  }
  editFlashSale() {
    console.log(this.editFlashSaleForm.value);

    this.addFail = false;
    this.addSuccess = false;
    this.showloader = true;


    this.userServ.UpdateFlashSale(this.itemToedit.id, this.editFlashSaleForm.value, this.adminToken).subscribe(
      (response: any) => {
        this.showloader = false;

        this.editSaleSuccess = true;
        this.editFlashSaleForm.reset()
        setTimeout(() => {
          this.editMode = false;
          this.getAllFlashSales()

        }, 2000);

        // this.getAllCategories;
      },
      err => {
        this.showloader = false;
        this.editSaleSuccessFail = true;
        console.log(err);



      }
    )


    //  UpdateFlashSale(id,data , token)

  }



}
