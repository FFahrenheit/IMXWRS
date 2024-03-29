import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = Object.create(null);
  public submitted = false;
  public returnUrl = '/';
  public showPassword = false;

  constructor(private router : Router,
              private fb : FormBuilder,
              private login : AuthenticationService,
              private alert : AlertService,
              private route : ActivatedRoute,
              private change : ChangePasswordService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [localStorage.getItem("remember-user")||"", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      remember: [false, Validators.compose([Validators.required])]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
      const loginForm : LoginForm = {
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value
      }; 
  
      this.login.login(loginForm).subscribe((resp)=>{
        if(resp == null || resp){
          if(this.form.controls['remember'].value){
            localStorage.setItem("remember-user",loginForm.username);
          }
          else{
            if(localStorage.getItem("remember-user") == loginForm.username){
              localStorage.removeItem("remember-user");
            }
          }
        } 
        if(resp == null){
          this.change.activateGuard();
          this.router.navigate(['profile','password','change']);
        }
        else if(resp){
          this.router.navigateByUrl(this.returnUrl);
        }else{
          this.alert.error('Incorrect credentials', { autoClose : true } );
        }
      },(err)=>{
        console.log(err);
        this.alert.error('Server error: ', { autoClose : true });
      }); 
    }
  }

  getClass(control){
    if(!this.form.controls[control].touched){
      return '';
    }
    return this.form.controls[control].hasError('required') ? 'is-invalid' : 'is-valid';
  }

}
