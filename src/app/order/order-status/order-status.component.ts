import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  showLoader = true;
  constructor(private userServ: UserService,private route:Router
    ) { }

  ngOnInit(): void {
 

    this.userServ.checkPaymentStatus(localStorage.getItem('reference'),localStorage.getItem("token")).subscribe(
      (response: any) => {
        console.log(response);
        const responseBody  = response?.body?.data?.status;
        if(responseBody == undefined){
          this.route.navigate(["/orderFail"]);

        }
        else if(responseBody!="SUCCESS"){
          this.route.navigate(["/orderFail"]);
 
         
          
        }
        else{
          console.log("start confirm order method");
          console.log("/http://137.184.146.80:8080/hanlbs/orderApi/ConfirmOrderAfterPay/" + localStorage.getItem('reference'))
          this.userServ.confirmOrderAfterPay(localStorage.getItem('reference'),localStorage.getItem("token")).subscribe(
            (response: any) => {
              console.log(response);
              localStorage.removeItem("reference");
              localStorage.removeItem("orderNo");
              console.log("success confirm order method");
              
          this.route.navigate(["/orderSuccess"]);
      
            },
            err => {
              console.log("fail confirm order method");
              this.route.navigate(["/orderFail"]);
              console.log(err);
      
      
      
            }
          )



          
          
        }
        // localStorage.removeItem("reference");

      },
      err => {
        console.log(err);



      }
    )
  }




  checkPaymentStatus(ref) {

    this.userServ.checkPaymentStatus(ref,localStorage.getItem("token")).subscribe(
      (response: any) => {
        // console.log(response);

      },
      err => {
        // this.showLoader = false;
        console.log(err);



      }
    )


  }
//checkPaymentStatus


}
