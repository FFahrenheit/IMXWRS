import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { GetWaiverService } from '../services/get-waiver.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerAuthorizationGuard implements CanActivate {

  constructor(private router : Router,
              private loggedUser : AuthenticationService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      let user = this.loggedUser.getUser();

      if(user.position == 'employee' && user.roles.length == 0){
        this.router.navigate(['403']);
      }
      return true;
  }
  
}
