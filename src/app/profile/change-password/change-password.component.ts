import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public form;
  public user : User;

  constructor(private fb : FormBuilder,
              private loginService : AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();

    this.form = this.fb.group({
      password : ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm : ['', Validators.compose([Validators.required])]
    });
  }

  passwordValid(){
    if(!this.form.controls['password'].touched){
      return '';    
    }
    return this.form.controls['password'].valid ? 'is-valid' : 'is-invalid';
  }

  confirmPassword(){
    if(!this.form.controls['confirm'].touched){
      return '';
    }
    return this.form.controls['confirm'].valid && this.form.controls['password'].valid &&
           this.form.controls['confirm'].value == this.form.controls['password'].value ? 
           'is-valid' : 'is-invalid';
  }

  get(control : string){
    return this.form.controls[control];
  }

  needsPassword(){
    let control = this.get('password');
    return control.touched && control.hasError('required');
  }

  regex(){
    let control = this.get('password');
    return control.touched && control.value.length < 6;
  }

  passwordMatch(){
    let control = this.get('confirm');
    let compare = this.get('password');
    return control.touched && control.value != compare.value;
  }

  needsConfirm(){
    let control = this.get('confirm');
    return control.touched && control.hasError('required');
  }

  next(){
    console.log('xd');
  }

}
