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

  private unsignedActivities;

  constructor(private http : HttpClient) { }

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
}
