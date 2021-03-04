import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../interfaces/login.interface';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators'
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private user : User;

  constructor(private http: HttpClient,
              private router: Router) { }

  login(form : LoginForm){
    return this.http.post(`${ base_url }/auth/login`,form)
               .pipe(map((resp : any)=>{
                 console.log(resp);
                 if(resp['ok']){
                   localStorage.setItem('username',resp.user.username);
                   localStorage.setItem('token',resp.token);
                   localStorage.setItem('position',resp.user.position);
                   localStorage.setItem('email',resp.user.email);
                  
                   this.user = new User(
                     resp.user.username,
                     resp.user.email,
                     resp.user.position,
                     resp.user.name
                   );

                   return true;
                 }else{
                   return false;
                 }
               }));
  }

  isLogged(){
    return this.validate('username') && this.validate('email') 
    && this.validate('token') && this.validate('position');
  }

  validate(name){
    let field = localStorage.getItem(name);
    return name != "" && name != "undefined";
  }

  getUser(){
    return this.user;
  }
}
