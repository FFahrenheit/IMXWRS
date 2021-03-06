import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = Object.create(null);
  public submitted = false;

  constructor(private router : Router,
              private fb : FormBuilder,
              private login: AuthenticationService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])]
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
      const loginForm : LoginForm = {
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value
      }; 
  
      this.login.login(loginForm).subscribe((resp)=>{
        if(resp){
          this.router.navigate(['waivers','all']);
        }else{
          console.log('error'+ resp);
        }
      },(err)=>{
        console.log(err);
      }); 
    }
  }

}
