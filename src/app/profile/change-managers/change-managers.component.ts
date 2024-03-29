import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PositionService } from 'src/app/services/position.service';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-change-managers',
  templateUrl: './change-managers.component.html',
  styleUrls: ['./change-managers.component.scss']
})
export class ChangeManagersComponent implements OnInit {

  public form : FormGroup = Object.create(null);
  public users;

  constructor(private fb : FormBuilder,
              private usersService : UsersService,
              private alert : AlertService,
              private position : PositionService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      engineering: ['', Validators.required],
      materials: ['', Validators.required],
      general: ['', Validators.required],
      npi: ['', Validators.required],
      operations: ['', Validators.required],
      quality: ['', Validators.required]
    });

    this.usersService.getUsers()
        .subscribe(resp=>{
          if(resp['status']){
            this.users = resp['users'];
            this.loadValues();
          }else{
            this.alert.error("Couldn't load users");
          }
        }, error=>{
          console.log(error);
          this.alert.error("Server error");
        });
  }

  public loadValues(){
    this.users.forEach(u => {
      let position = u['position'] as string;
      if(position != 'employee'){
        let ctrl = this.get(position.split(' ')[0]) || null;
        if(ctrl != null){
          ctrl.setValue(u['username']);
        }
      }
    });
  }

  public get(ctrl : string) : AbstractControl{
    return this.form.controls[ctrl];
  }

  public getClass(ctrl : string){
    if(this.get(ctrl).untouched){
      return ''
    };
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public next() : void{
    let body = Object.create(null);
    let managers = this.form.controls;
    
    body.managers = [];

    Object.keys(managers).forEach(m => {
      let key = m + ' ' + 'manager';
      
      const obj = {
        username: managers[m].value,
        position: key 
      }
      
      body.managers.push(obj);
    });

    console.log(body);

    this.position.updateManagers(body)
        .subscribe(resp=>{
          if(resp){
            this.alert.success("Managers updated");
            setTimeout(() => {
              window.location.reload();
            }, 2500);
          }else{
            this.alert.error(this.position.getError());
          }
        },error=>{
          this.alert.error(this.position.getError());
        });
  }

}
