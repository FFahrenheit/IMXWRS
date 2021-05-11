import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private username : string;
  public user : User;

  constructor(private route : ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('user');
    });
  }

}
