import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private http: HttpClient) { }

  signActivity(waiverId : number){
    let body = {
      waiver: waiverId
    };
    return this.http.put(`${ base_url }/activities/unsigned`,body)
               .pipe(map((resp : any)=>{
                 console.log(resp);
                 if(resp.ok){
                   return true;
                 }
                 return false;
               }),catchError((error)=>{
                 console.log(error);
                 return of(false);
               }));
  }
}
