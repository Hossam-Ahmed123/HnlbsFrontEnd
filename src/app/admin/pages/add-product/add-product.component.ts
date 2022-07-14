import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { faChevronLeft, faChevronRight, faWallet,faEdit,faFolderOpen,faTrashAlt,faCheckCircle, faSignOutAlt, faTimes, faFileAlt, faCube, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @ViewChild('myInptMaster', {static: false})
  myFileInput: ElementRef;
  @ViewChild('myInptDetails', {static: false})
  myFileInput2: ElementRef;
  showAddToCartMessage = false;
  showAddJobLssThanLimit = false;
  showLoaderInput = false;
  ValiditySuccess = false;
  ValidityFail = false;
  faFolderOpen = faFolderOpen;
  url: SafeResourceUrl;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faTimesCircle = faTimesCircle;
  faCcVisa = faCcVisa;
  faWallet = faWallet;
  showAddForm: boolean = true;
  paymentUrl: string;
  uuidValue: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  tagsList: any = [];
  externalLinks: any = [];
  addProductForm: FormGroup;
  editProductForm: FormGroup;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faCheckCircle = faCheckCircle;
  faSignOutAlt = faSignOutAlt;
  faFileAlt = faFileAlt;
  faTwitter = faTwitter;
  faTimes = faTimes;
  faCube = faCube;
  showSuccessMessage = false;
 
  textPattern;


  showLoader = false;


  uploadedFiles: any = [];
  uploadForm: FormGroup;
  uploaded: any;
  disupload = false;
  selectedUploadedFiles: any = [];
  uploadForm2: FormGroup;
  showLanguageDetails = false;




  creditBalanceUrl;
  showCreditErrorLimit = false;
  showCreditError = false;
  showAddBalanceSuccess = false;
  showAddBalanceFail = false;

  taxValueForBalance;
  costAfterTaxForBalance;
  taxValueInRialForBalance = 0;
  showAddBalanceBox = true;
  showAddtoCartBox = false;
  showAddBalanceError = false;
  adminToken;

  allBrands;
  addProductSuccess = false;
  addProductFail = false;
  addProductDialog = false;
  addProductDialog22 = false;
  allCategories;
  selectedCategory = 0;
  childCategories;
  selectedSubCategory = 0;
  selectedSubCategoryForSearch = 0;
  LastLevelCategories;

targetedFormcategory = 0;
selectedBrand = 0;
allTableData;

selectedCategoryForSearch;

DeleteMode = false;
projectToDelete;
deleteFail = false;


editMode = false;
productToEdit;
editFail = false;
editProductSuccess = false;
selectedColor;
  constructor(private uploadServ: UploadFileService, private userServ: UserService, private formBuilder: FormBuilder, private route: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.getAllCategories()
    this.getAllBrands()
    this.adminToken = localStorage.getItem("auth")
    this.addProductForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      price: new FormControl(null, Validators.required),
      // sku: new FormControl(null,Validators.required),
    
      discount: new FormControl(null),
      // quantity: new FormControl(null, Validators.required),
      base64Master: new FormControl(null),
      brand: new FormControl({
        // "id": 1,
        // "name": "ZARA"
      }),
      category: new FormControl({
        // "categoryId": this.targetedFormcategory,
        // "name": "Boys Shirts"
      }),
      content: new FormControl(null),
      childImages: new FormArray([]),
      color: new FormControl(null,Validators.required),
      colorGroupCode: new FormControl(null,Validators.required),
      colorSKUCode: new FormControl(null,Validators.required),
      // childrenSize: new FormArray([]),
      childrenSize: new FormArray([]),



    });

    this.editProductForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      price: new FormControl(null, Validators.required),
      // sku: new FormControl(null,Validators.required),
    
      discount: new FormControl(null),
      quantity: new FormControl(null, Validators.required),

      content: new FormControl(null),
      color: new FormControl(null),





    });
  }


  addProduct() {
    // console.log(this.targetedFormcategory);
    

    if(this.selectedCategory ==0){
      alert("select category")
    }
    else if(this.targetedFormcategory ==0){
      alert("select sub category")
    }

    else if(this.selectedBrand ==0){
      alert("select brand")
    }
    else if(this.addProductForm.get("childImages").value == null || (<FormArray>this.addProductForm.get("childImages")).length==0){
      alert("select product details images")
    }

    else{

  
    let cat = {categoryId:this.targetedFormcategory};
    let brand = {id:this.selectedBrand};
    (<FormControl>this.addProductForm.get("category")).patchValue(cat);
    (<FormControl>this.addProductForm.get("brand")).patchValue(brand);
    


  

    console.log(this.addProductForm.value);
    this.showLoader = true;
    this.addProductSuccess = false;
    this.addProductFail = false;
    if (this.addProductForm.get("base64Master").value == null) {
      this.showLoader = false;
      alert("Pick Product Image")
    }
    else {
      console.log(this.addProductForm.value);

      this.userServ.addProduct(this.addProductForm.value, this.adminToken).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log(response); 

          this.addProductSuccess = true;
          this.addProductForm.reset()
          this.selectedCategory = 0;
          this.targetedFormcategory = 0;
          this.selectedSubCategory = 0;
          this.selectedBrand = 0;
          this.myFileInput.nativeElement.value = '';
          this.myFileInput2.nativeElement.value = '';
          setTimeout(() => {
            this.route.navigateByUrl('/headerVirtual', { skipLocationChange: true }).then(() => {
              this.route.navigate(['/dashboard/addProduct']);
              this.addProductDialog = true;
        
            });
            
          }, 1000);
         
        },
        err => {
          this.showLoader = false;
          this.addProductFail = true;
          console.log(err);



        }
      )


    }

  }

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

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {

        const imageBase = upData.split(',')[1];
        // console.log(imageBase);
        this.addProductForm.get("base64Master").setValue(imageBase)



      }
    )
  }

  openAddProductDialog(){
    this.addProductDialog = true;
  }
  closeAddProductDialog(){
    this.addProductDialog = false;
  }


  getProductsByCategory(){
    
    if(this.selectedSubCategoryForSearch==0){
      alert("please select Category")
    }
    else{
      console.log(this.selectedSubCategoryForSearch);

 
      
    this.userServ.getProductsByChildCategory(this.selectedSubCategoryForSearch).subscribe(
      (response: any) => {
        console.log("all products table date ");
        
        console.log(response);
        this.allTableData = response;
        // this.allBrands = response


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


    }
    

  }
  getSubCategory(){

          
    this.userServ.getSubCategory(this.selectedCategory).subscribe(
      (response: any) => {
        console.log("sub categories response");
        
        console.log(response);
        this.childCategories = response.childrenCategories;
  


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }



  getSubCategoryForSearch(){

              
    this.userServ.getSubCategory(this.selectedCategoryForSearch).subscribe(
      (response: any) => {
        console.log("sub categories response");
        
        console.log(response);
        this.childCategories = response.childrenCategories;
  


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }
  openDeleteProductDialog(project){
    this.projectToDelete = project
    this.DeleteMode = true;

  }

  closeDeleteProductDialog(){
    this.projectToDelete = null
    this.DeleteMode = false;

  }
 
  deleteProduct(){
    this.deleteFail = false;
    this.showLoader = true;
    this.userServ.deleteProduct(this.projectToDelete.id,this.adminToken).subscribe(
      (response: any) => {
        this.showLoader = false;
        console.log("product deleted");
        this.closeDeleteProductDialog();
        this.getProductsByCategory()

        
  


      },
      err => {
        console.log("eror in product delete");
        this.showLoader = false;
        this.deleteFail = true;
        console.log(err);



      }
    )

  }


  openEditProductDialog(project){
    this.productToEdit = project
    this.editMode = true;
    this.editProductForm.get("name").setValue(this.productToEdit.name)
    this.editProductForm.get("description").setValue(this.productToEdit.description)
    this.editProductForm.get("price").setValue(this.productToEdit.price)
    this.editProductForm.get("sku").setValue(this.productToEdit.sku)
    this.editProductForm.get("discount").setValue(this.productToEdit.discount)
    this.editProductForm.get("quantity").setValue(this.productToEdit.quantity)
    this.editProductForm.get("content").setValue(this.productToEdit.content)
    this.editProductForm.get("color").setValue(this.productToEdit.color)
    



  }

  closeEditProductDialog(){
    this.productToEdit = null
    this.editMode = false;

  }


  editProduct() {
    this.editFail = false;
    this.editProductSuccess = false;
    // console.log(this.targetedFormcategory);
    
    // let cat = {categoryId:this.targetedFormcategory};
    // let brand = {id:this.selectedBrand};
    // (<FormControl>this.addProductForm.get("category")).patchValue(cat);
    // (<FormControl>this.addProductForm.get("brand")).patchValue(brand);
    
    // console.log(this.adminToken);
    console.log(this.editProductForm.value);
    this.showLoader = true;
    // this.addProductSuccess = false;
    // this.addProductFail = false;


//id,data , token

      this.userServ.editProduct(this.productToEdit.id,this.editProductForm.value, this.adminToken).subscribe(
        (response: any) => {
          this.showLoader = false;

          this.editProductSuccess = true;
          this.editProductForm.reset()
          setTimeout(() => {
            this.editMode = false;
            this.editProductSuccess = false;
            this.getProductsByCategory()
            
          }, 2000);
      
        },
        err => {
          this.showLoader = false;
          this.editFail = true;
          console.log(err);



        }
      )


    



  }



  onFileSelect(event) {

 


    if (event.target.files.length > 0) {
      const files = event.target.files;
      for (const file of files) {
        
        this.uploadServ.convertToBase64(file);
        this.uploadServ.myimage.subscribe(
          (upData) => {
    
            const imageBase = upData.split(',')[1];
            const childImageBase = {base64:imageBase};
    (<FormArray>this.addProductForm.get("childImages")).push(new FormControl (childImageBase));
            // (<FormArray>this.addProductForm.get("childImages")).push(new FormControl(imageBase))
            // console.log(imageBase);
          
    
    
    
          }
        )
        // console.log("upload file");
        // console.log(file);

        // const size = (file.size / 1048576).toFixed(2);



        // const fileType = (file.name.substring(file.name.lastIndexOf(".") + 1))

     

              this.selectedUploadedFiles.push(file);
              // event.target.value = null;
              this.uploadedFiles.push(file)



              // for(const c of this.selectedUploadedFiles){


              // }



            


        
          




        

       


      }


    }
  }



  onRemoveFile2(index) {
    this.selectedUploadedFiles.splice(index, 1)
  }

  //    (<FormArray>this.addProductForm.get("childImages")).push(new FormControl (childImageBase));


  onAddSize() {
    const size = new FormGroup({
      bust: new FormControl(null),
      length: new FormControl(null),
      quantity: new FormControl(null),
      shoulder: new FormControl(null),
      size: new FormControl(null),
      sleevelength: new FormControl(null),
      sKUCode: new FormControl(null),

    });
    (<FormArray>this.addProductForm.get("childrenSize")).push(size);
  }


  editProductSize(product){

    this.route.navigate(["dashboard/editProductSize/" + product.id]);

  }

  pushColor(){
    alert(this.selectedColor)
  }

  onRemoveSize(i){
    (<FormArray>this.addProductForm.get("childrenSize")).removeAt(i)
    // this.tagsList.splice(index, 1);
  }
}
