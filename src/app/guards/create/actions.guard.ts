import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsGuard implements CanActivate {

  constructor(private waiverService : CreateWrService,
              private router : Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return true;
      if(this.waiverService.wr.deviations == null || this.waiverService.wr.risk == null){
        this.router.navigate(['create','details']);
      }
      return true;
  }  
}
