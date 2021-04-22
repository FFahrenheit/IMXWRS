import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { GetWaiverService } from '../services/get-waiver.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private loadWaiver : GetWaiverService){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.loadWaiver.loadWaiverGuardApproveSelf(route.params.id);
  }
  
}
