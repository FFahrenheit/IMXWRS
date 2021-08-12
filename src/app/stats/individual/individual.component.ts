import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/shared/alert';
import { Charting } from 'src/app/util/charting';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {

  public charts;
  public user;
  public form : FormGroup;
  public users : any[];
  public username : string = null;

  constructor(private alert : AlertService,
              private userService : UsersService,
              private fb : FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      user: ['', Validators.required]
    });

    this.userService.getUsers()
    .subscribe((resp:any)=>{
      console.log(resp);

      if(resp.status){
        this.users = resp.users;
        console.log(this.users);
      }
    },(error)=>{
      console.log(error);
      this.alert.error("Couldn't retrieve users");
    });
  }

  public loadUser() : void{
    this.userService.getUser(this.username).subscribe(
      resp=>{
        if(resp == null){
          this.alert.error("The information of this user couldn't be retrieved");
        }
        console.log(resp);
        if(resp){
          this.user = this.userService.getCurrentUser();
          let stats = this.userService.getStats();
          console.log(stats);

          let data = new Charting();
          
          this.charts = data.getCharts(stats, this.user.username);
          console.log(this.charts);
        }
      },
      error=>{
        this.alert.error("The information of this user couldn't be retrieved");
      }
    )
  } 

  public getClass(ctrl : string) : string{
    if(this.get(ctrl).untouched){
      return '';
    }

    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public get(ctrl : string) : AbstractControl{
    return this.form.controls[ctrl];
  }

  public onChange($user){
    console.log($user);
    this.username = $user;
    this.loadUser();
  }

}
