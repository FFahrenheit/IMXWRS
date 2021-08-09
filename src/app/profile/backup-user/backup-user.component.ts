import { Component, OnInit } from '@angular/core';
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
  public users: [];
  public backupUsers: [];

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private alert: AlertService,
              private positionService : PositionService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('user');
    });

    this.usersService.getUsers()
      .subscribe(resp => {
        if (resp['status']) {
          this.users = resp['users'];
        } else {
          this.alert.error("Couldn't load users");
        }
      }, error => {
        console.log(error);
        this.alert.error("Server error");
      });

      this.positionService.loadBackups(this.username)
          .subscribe(resp=>{
            if(resp){
              this.user = this.positionService.getUser();
              this.backupUsers = this.positionService.getBackups();

              console.log({
                user: this.user,
                backups: this.backupUsers
              });
            }else{
              this.alert.error(this.positionService.getError());
            }
          },error=>{
            this.alert.error(this.positionService.getError());
          })

  }

}
