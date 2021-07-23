import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsGuard implements CanActivate {
  constructor(private waiverService: CreateWrService,
    private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return true;
    if (this.waiverService.wr.pieces == null || this.waiverService.wr.pieces == null) {
      this.router.navigate(['create', 'new']);
    }
    return true;
  }

}
