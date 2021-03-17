import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthorizationsService {

  private pendingAuthorizations = [];

  constructor(private http : HttpClient) { }

  loadPendingAuthorizations(){
    return this.http.get(`${ base_url }/authorizations`)
               .pipe(
                 map((resp:any)=>{
                   if(resp.ok){
                     this.pendingAuthorizations = resp.authorizations;
                     return true;
                   } 
                   return false;
                 }),catchError((error)=>{
                   console.log(error);
                   return of(false);
                 })
               );
  }

  getPendingAuthorizations(){
    return this.pendingAuthorizations;
  }
}
