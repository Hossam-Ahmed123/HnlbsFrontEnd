import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientPolicyGuard implements CanActivate {
  constructor(private userServ:UserService,private route:Router){}
  canActivate(): boolean{
    if(this.userServ.isClient()){
      // this.route.navigate(["/profile"]);
      return true;
    }
    else{
      this.route.navigate(["/login"]);
      return false;
    }
} 
}