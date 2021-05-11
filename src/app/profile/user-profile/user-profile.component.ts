import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public username : string;
  public user : User = null;
  public tests = Array(5).fill(0).map((x,i)=>i);

  constructor(private route : ActivatedRoute,
              private userService : UsersService,
              private alert : AlertService) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('user');
    });

    this.userService.getUser(this.username).subscribe(
      resp=>{
        console.log(resp);
        if(resp){
          this.user = this.userService.getCurrentUser();
        }
      },
      error=>{
        this.alert.error("The information of this user couldn't be retrieved");
      }
    )
  }

}
