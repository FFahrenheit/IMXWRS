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
export class UsersService {

  private loadedUser : User;
  private stats : any;

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get(`${ base_url }/users`);
  }

  getUser(user : string){
    return this.http.get(`${ base_url }/users/${user}`)
               .pipe(
                 (map((resp:any)=>{
                   console.log(resp);
                   if(resp['ok']){
                     
                     const user : User = {
                       username : resp.user.username,
                       email : resp.user.email,
                       name : resp.user.name,
                       position : resp.user.position
                     };

                     this.loadedUser = user;
                     this.stats = resp['stats'];
                     
                     return true;

                   }
                   return false;
                 })),
                 catchError(error=>{
                   return of(null);
                 })
               );
  }

  getCurrentUser(){
    return this.loadedUser;
  }

  getStats(){
    return this.stats;
  }
}
