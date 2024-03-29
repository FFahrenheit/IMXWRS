import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GetWaiverService } from '../services/get-waiver.service';

@Injectable({
  providedIn: 'root'
})
export class CloseGuard implements CanActivate {

  constructor(private waiverService : GetWaiverService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this.waiverService.loadWaiverCloseWaiver(route.params.id);
  }
  
}
