import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  @Input() public user : User;
  @Input() public profileTitle = 'User profile';
  @Input() public autoLoad = false;

  constructor(private loginService : AuthenticationService) { }

  ngOnInit(): void {
    if(this.autoLoad){
      this.user = this.loginService.getUser();
    }
  }

}
