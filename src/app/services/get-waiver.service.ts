import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GetWaiverService {

  private wr : any = null;
  constructor(private http : HttpClient) { 
  }

  loadWaiver(waiverId : string){
    return this.http.get(`${ base_url }/waiver/${ waiverId }`)
               .pipe(
                 map((resp:any)=>{
                   console.log(resp);
                   if(resp['ok'] == true){
                     this.wr = resp['waiver'];
                     return true;
                   }
                   return false;
                 }),
                 catchError((error)=>{
                   console.log(error);
                   return of(false);
                 })
               )
  }
  getWaiver(){
    return this.wr;
  }
}
