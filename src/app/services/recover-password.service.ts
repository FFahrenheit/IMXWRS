import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {

  constructor(private http : HttpClient) { 
  }

  public sendEmail(username){
    return this.http.post(`${ base_url }/user/recover`, username)
        .pipe(
          (map((resp:any)=>{
            console.log(resp);
            if(resp['ok']){
              return true;
            }
            return false;
          }),catchError(error=>{
            console.log(error);
            return of(false);
          }))
        )
  }
}
