import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  showLoader = false;
  allUserData;
  editProfileForm: FormGroup;
  constructor(private route: Router,
    private userServ: UserService) { }

  ngOnInit(): void {
    this.getUserData()


    this.editProfileForm = new FormGroup({
      name: new FormControl(null),
      address: new FormControl(null),
      phone: new FormControl(null)
    });
  }
  getUserData() {

    this.userServ.getCurrentUser(localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        this.allUserData = response;

        this.editProfileForm.get("name").setValue(this.allUserData.name)
        this.editProfileForm.get("address").setValue(this.allUserData.address)
        this.editProfileForm.get("phone").setValue(this.allUserData.phone)


      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }

  edit() {
    console.log(this.editProfileForm.value);

    this.userServ.editCustomer(localStorage.getItem("loggedUserId"),localStorage.getItem("token"),this.editProfileForm.value).subscribe(
      (response: any) => {
        console.log(response);





      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )
    // editCustomer(customerID,token,data)

  }
}
