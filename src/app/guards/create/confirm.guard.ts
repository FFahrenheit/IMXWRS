import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmGuard implements CanActivate {

  constructor(private waiverService: CreateWrService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.waiverService.wr.risk == null) {
      this.router.navigate(['create', 'risks']);
    }
    return true;
  }
}