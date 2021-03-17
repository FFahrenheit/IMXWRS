import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AcitiviesService {

  private unsignedActivities = [];
  private activites = [];

  constructor(private http : HttpClient) { }

  getMyTasks(){
    return this.http.get(`${ base_url }/activities/pending`)
    .pipe(
      map((resp:any)=>{
        console.log(resp);
        if(resp['ok'] == true){
          this.activites = resp['actions'];
          return true;
        }
        return false;
      }),
      catchError((error)=>{
        console.log(error);
        return of(false);
      })
    );
  }

  signActivity(id : number){
    let body = { id };

    return this.http.put(`${ base_url }/activities/pending`,body)
               .pipe(
                 map((resp:any)=>{
                   if(resp.ok){
                     return true;
                   }else{
                     return false;
                   }
                 }),
                 catchError(error=>{
                   console.log(error);
                   return of(false);
                 })
               );
  }

  getMyActivities(){
    return this.http.get(`${ base_url }/activities/unsigned`)
              .pipe(
                map((resp:any)=>{
                  console.log(resp);
                  if(resp['ok'] == true){
                    this.unsignedActivities = resp['actions'];
                    return true;
                  }
                  return false;
                }),
                catchError((error)=>{
                  console.log(error);
                  return of(false);
                })
              );
    }

  getUnsigned(){
    return this.unsignedActivities;
  }

  getPending(){
    return this.activites;
  }
}
