import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { PositionService } from 'src/app/services/position.service';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-backup-user',
  templateUrl: './backup-user.component.html',
  styleUrls: ['./backup-user.component.scss']
})
export class BackupUserComponent implements OnInit {

  public username: string;
  public user: User = null;
  public users: any[];
  public backupUsers: any[];

  public form: FormGroup = Object.create(null);

  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
    private alert: AlertService,
    private positionService: PositionService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('user');
    });

    this.form = this.fb.group({
      user: [null, Validators.required]
    });

    this.usersService.getUsers()
      .subscribe(resp => {
        if (resp['status']) {
          this.users = resp['users'].filter(u => u.position == 'employee');
        } else {
          this.alert.error("Couldn't load users");
        }
      }, error => {
        console.log(error);
        this.alert.error("Server error");
      });

    this.positionService.loadBackups(this.username)
      .subscribe(resp => {
        if (resp) {
          this.user = this.positionService.getUser();
          this.backupUsers = this.positionService.getBackups();

          console.log({
            user: this.user,
            backups: this.backupUsers
          });
        } else {
          this.alert.error(this.positionService.getError());
        }
      }, error => {
        this.alert.error(this.positionService.getError());
      });
  }

  public get(ctrl: string): AbstractControl {
    return this.form.controls[ctrl];
  }

  public getClass(ctrl: string): string {
    if (this.get(ctrl).untouched) {
      return '';
    }
    return this.form.valid ? 'is-valid' : 'is-invalid';
  }

  public add(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    let user = this.get('user').value;
    let backups = this.backupUsers.map(b => b.username);
    let fullUser = this.users.filter(u => u.username == user)[0];
    console.log({
      backups,
      fullUser
    });

    fullUser['enabled'] = 0;

    if (backups.includes(user)) {
      this.alert.error('This user is already a backup user');
    } else {
      this.backupUsers.push(fullUser);
    }
    this.form.reset();
  }

  public deleteBackup(index : number){
    this.backupUsers.splice(index,1);
  }

  public save() : void{
    let body = this.backupUsers.map(b => ({
       lender: this.username, 
       granted: b.username, 
       enabled: b.enabled }));

    this.positionService.saveBackups(this.username, body)
        .subscribe(resp=>{
          if(resp){
            this.alert.success("Changes saved");
            setTimeout(() => {
              window.location.reload();
            }, 2500);
          }else{
            this.alert.error(this.positionService.getError());
          }
        },error=>{
          this.alert.error(this.positionService.getError());
        });
  }

  public toggleBackup(event, username){
    let state = event.currentTarget.checked ? 1 : 0;
    let u = this.backupUsers.find(n => n.username == username);
    u.enabled = state;
    // console.log({ u, users: this.backupUsers, state});
  }

}
