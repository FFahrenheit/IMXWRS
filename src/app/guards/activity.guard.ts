import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GetWaiverService } from '../services/get-waiver.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityGuard implements CanActivate {

  constructor(private waiverService : GetWaiverService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.waiverService.loadWaiverHasActivity(route.params.id);
  }
  
}
