import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ChangePasswordService } from '../services/change-password.service';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordGuard implements CanDeactivate<unknown> {
  
  constructor(private changeService : ChangePasswordService){}
  
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot) {
    return this.changeService.canNavigate();
  }
  
}
