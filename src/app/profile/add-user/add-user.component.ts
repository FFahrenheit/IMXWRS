import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public form : FormGroup = Object.create(null);

  constructor(private fb    : FormBuilder,
              private alert : AlertService,
              private auth  : AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['',Validators.required],
      username: ['',Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
      temporal: [''],
      position: ['employee']
    });
  }

  get(control : string) : AbstractControl{
    return this.form.controls[control];
  }

  public getClass(ctrl : string){
    if(!this.get(ctrl).touched){
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public next(){
    this.get('temporal').setValue(this.get('password').value);
    console.log(this.form.value);
    this.auth.newUser(this.form.value)
        .subscribe(resp=>{
          if(resp){
            this.alert.success(this.get('name').value + ' added', { autoClose : false });
            this.form.reset();
          }else{
            this.alert.error("Couldn't add user. Check if user already exists or try again");
          }
        },error=>{
          this.alert.error("Couldn't add user. Check if user already exists or try again");
        });
  }

}
