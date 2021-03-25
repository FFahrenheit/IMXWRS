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
  private recentAuthorizations = [];

  constructor(private http : HttpClient) { }

  loadRecent(){
    return this.http.get(`${ base_url }/authorizations/approved`)
    .pipe(
      map((resp:any)=>{
        if(resp.ok){
          this.recentAuthorizations = resp.authorizations;
          return true;
        } 
        return false;
      }),catchError((error)=>{
        console.log(error);
        return of(false);
      })
    );
  }

  authorizeWaiver(waiver : string){
    let body = { waiver };
    return this.http.put(`${ base_url }/authorizations`,body)
        .pipe(map((resp:any)=>{
          if(resp.ok){
            return true;
          }
          return false;
        }),catchError(error=>{
          console.log(error);
          return of(false);
        }));
  }

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

  getRecentAuthorizations(){
    return this.recentAuthorizations;
  }
}