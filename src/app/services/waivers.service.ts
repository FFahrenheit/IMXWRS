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
  
  private savedFilters = '';
  public savedObject : any;
  private waiversLog = [];
  private myWaivers = [];
  private myRemarks = [];

  constructor(private http : HttpClient) { }

  getMyWaivers(body){
    let query = this.geyMyFilters(body);
    return this.http.get(`${ base_url }/waivers?${ query }`)
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

  getMyRemarks(body){
    let query = this.geyMyFilters(body);
    return this.http.get(`${ base_url }/waivers/remarks?${ query }`)
               .pipe(
                 map((resp:any)=>{
                   if(resp.ok){
                     this.myRemarks = resp.waivers;
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

  private geyMyFilters(body){
    let filters = [];
    Object.keys(body).forEach(key=>{
      let query = key + "=" + body[key];
      filters.push(query);
    });
    return filters.join('&');
  }

  private getFilters(body){
    this.savedObject = body;
    let filters = [];
    Object.keys(body).forEach(key=>{
      let query = key + "=" + body[key];
      filters.push(query);
    });
    this.savedFilters = filters.join('&');
    return this.savedFilters;
  }

  getWaiverLog(filters){
    console.log('Saved filters: ' + this.savedFilters);
    let query;
    if(filters == ''){
      query = this.savedFilters || '';
    }else{
      query = this.getFilters(filters);
    }
    return this.http.get(`${ base_url }/waivers/all?${ query }`)
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

  getMyRemarked(){
    return this.myRemarks;
  }
}
