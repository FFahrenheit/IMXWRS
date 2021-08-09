import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private errorMessage = 'Service error';

  constructor(private http: HttpClient) { }

  public updateManagers(body : Object){
    return this.http.put(`${base_url}/position`, body)
               .pipe(
                 map(resp=>{
                   if(resp['ok']){
                     return true;
                   }
                   this.errorMessage = "Couldn't update managers"
                   return false;
                 }),catchError(error=>{
                   this.errorMessage = "Server didn't respond";
                   return of(false);
                 })
               );
  }

  public getError() : string{
    return this.errorMessage;
  }
}
