import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReopenService {

  constructor(private http : HttpClient) {    
  }

  reopenWaiver(waiver : string, body){
    return this.http.put(`${base_url}/waiver/${waiver}`,body)
               .pipe(
                 map((resp:any)=>{
                   if(resp['ok']){
                     return true;
                   }
                   return false;
                 }),
                 catchError(error=>{
                   console.log(error);
                   return of(false);
                 })
               )
  }
}
