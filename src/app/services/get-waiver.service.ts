import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GetWaiverService {

  private wr: any = null;

  constructor(private http: HttpClient,
    private router: Router,
    private loggedUser : AuthenticationService) {
  }

  loadWaiver(waiverId: string) {
    return this.http.get(`${base_url}/waiver/${waiverId}`)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          if (resp['ok'] == true) {
            this.wr = resp['waiver'];
            return true;
          }
          return false;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  loadWaiverGuardOnHold(waiverId: string) {
    return this.http.get(`${base_url}/waiver/${waiverId}`)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          if (resp['ok'] == true) {
            this.wr = resp['waiver'];
            if (this.wr.status == 'on hold') {
              return true;
            }
          }
          this.router.navigate(['403']);
          return false;
        }),
        catchError((error) => {
          console.log(error);
          this.router.navigate(['403']);
          return of(false);
        })
      );
  }


  loadWaiverGuardApproveSelf(waiverId: string) {
    return this.http.get(`${base_url}/waiver/${waiverId}`)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          if (resp['ok'] == true) {
            let user = this.loggedUser.getUser();
            this.wr = resp['waiver'];
            //May add new conditions
            if (this.wr.status != 'closed' && user.position != 'employee') {
              return true;
            }
          }
          this.router.navigate(['403']);
          return false;
        }),
        catchError((error) => {
          console.log(error);
          this.router.navigate(['403']);
          return of(false);
        })
      );
  }
  getWaiver() {
    return this.wr;
  }

  downloadFile(file : string){
    return `${base_url}/files/${file}`;
  }
}
