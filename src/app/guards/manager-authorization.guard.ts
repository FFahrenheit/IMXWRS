import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManagerAuthorizationGuard implements CanActivate {

  constructor(private router : Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(false){
        this.router.navigate(['505']);
      }
      return true;
  }
  
}
