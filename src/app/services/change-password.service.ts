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

  constructor(private http : HttpClient) { 
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
}
