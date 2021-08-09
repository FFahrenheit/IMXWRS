import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { userSidebar, adminSidebar } from './dashboard.component.sidebar'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public shown = true;
  public user : User;
  public selectedIndex = 0;
  public sidebar;

  constructor(private router: Router,
              private loginService : AuthenticationService,
              private changeService : ChangePasswordService) { }

  ngOnInit(): void {
    this.selectedIndex = + sessionStorage.getItem('index') || 0;
    $("#menu-toggle").click((e)=> {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    this.user = this.loginService.getUser();
    if(this.user.position == 'developer'){
      this.sidebar = userSidebar.concat(adminSidebar);
    }
    else if(this.user.position == 'employee'){
      this.sidebar = userSidebar;
    }else{
      this.sidebar = adminSidebar;
    }
}

  goTo(route : any , i: any){
    this.router.navigate(route);
    this.selectedIndex = i;
    sessionStorage.setItem('index',i);
  }

  logout(){
    this.changeService.deactivateGuard();
    this.loginService.logout();
    this.router.navigate(['authentication','login']);
    sessionStorage.removeItem('index');
  }

  changePassword(){
    this.router.navigate(['profile','password','change']);
  }

  addUsers(){
    this.router.navigate(['profile','users','add'])
  }

  goToProfile(){
    this.router.navigate(['profile',this.user.username]);
  }

  changeManagers(){
    this.router.navigate(['profile','managers','change']);
  }

  myBackup(){
    this.router.navigate(['profile', this.user.username, 'backup']);
  }

}
