import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private errorMessage = 'Service error';
  private user : User;
  private backups : [];

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

  public loadBackups(username : string){
    return this.http.get(`${base_url}/position/${username}`)
               .pipe(
                 map(resp=>{
                   console.log(resp);
                   if(resp['ok']){
                     let u = resp['user'];
                     this.user = new User(
                       u.username,
                       u.email,
                       u.position,
                       u.name,
                       []
                     );
                     this.backups = resp['backups'];         
                     return true;     
                   }
                   this.errorMessage = "Couldn't load backup users";
                   return false;
                 }),catchError(error=>{
                   console.log(error);
                   this.errorMessage = "Couldn't get the backup users";
                   return of(false);
                 })
               )
  }

  public saveBackups(username : string, users : string[]){
    let body = {
      backups : users
    };

    return this.http.post(`${base_url}/position/${username}`, body)
              .pipe(
                map(resp=>{
                  if(resp['ok']){
                    return true;
                  }
                  this.errorMessage = "Error saving backup users";
                  return false;
                }),catchError(error=>{
                  this.errorMessage = "Couldn't save backup users";
                  return of(false);
                })
              );
  }

  public getError() : string{
    return this.errorMessage;
  }

  public getUser() : User{
    return this.user;
  }

  public getBackups() : []{
    return this.backups;
  }
}
