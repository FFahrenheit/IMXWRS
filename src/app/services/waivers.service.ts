import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class WaiversService {

  private waiversLog = [];
  private myWaivers = [];

  constructor(private http : HttpClient) { }

  getMyWaivers(){
    return this.http.get(`${ base_url }/waivers`)
               .pipe(
                 map((resp:any)=>{
                   if(resp.ok){
                     this.myWaivers = resp.waivers;
                     return true;
                   }
                   return false;
                 }),
                 catchError(error=>{
                   console.log(error);
                   return of(false);
                 })
               );
  }

  getWaiverLog(){
    return this.http.get(`${ base_url }/waivers/all`)
               .pipe(
                 (map((resp : any)=>{
                   if(resp.ok){
                     this.waiversLog = resp.waivers;
                     return true;
                   }
                   return false;
                 })),
                 catchError(error=>{
                   console.log(error);
                   return of(false);
                 })
               );
  }

  getLog(){
    return this.waiversLog;
  }

  getMyLog(){
    return this.myWaivers;
  }
}
