import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  
  private isLocked = false;

  constructor(private http : HttpClient) {
    this.isLocked = localStorage.getItem('locked') == '1'; 
  }

  changePassword(password){

    return this.http.put(`${base_url}/user/recover`,password)
        .pipe(
          map(resp=>{
            console.log(resp);
            if(resp['ok']){
              return true;
            }
            return false;
          },catchError(err=>{
            console.log(err);
            return of(false);
          }))
        )
  }

  public activateGuard(){
    this.isLocked = true;
    localStorage.setItem('locked','1');
  }

  public deactivateGuard(){
    this.isLocked = false;
    localStorage.removeItem('locked');
  }

  public canNavigate(){
    return !this.isLocked;
  }
}
