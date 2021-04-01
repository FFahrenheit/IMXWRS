import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EditService } from '../services/edit.service';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {

  constructor(private editService : EditService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this.editService.isValid(route.params.id);
  }
  
}
