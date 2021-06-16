import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GetStatDataService {

  private data;

  constructor(private http  : HttpClient) { }

  public loadData(type: string = 'waivers', user : string = 'all'){
    return this.http.get(
      `${ base_url }/stats/data/${ type }?username=${ user }`
      ).pipe(
        map((resp:any)=>{
          if(resp['ok']){
            this.data = resp['data'];
            return true;
          }
          return false;
        },catchError(error=>{
          console.log(error);
          return of(false);
        }))
      );
  }

  public getData(){
    return this.data;
  }

}
