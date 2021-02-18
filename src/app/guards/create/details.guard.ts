import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    if (this.waiverService.wr.pieces == null || this.waiverService.wr.pieces == null) {
      this.router.navigate(['create', 'new']);
    }
    return true;
  }

}
