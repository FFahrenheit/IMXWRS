import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  private userSidebar = [
    {
      name: "Waivers log",
      route: [ 'waivers', 'all']
    },
    {
      name: "New WR",
      route: [ 'create' , 'new'],
    },
    {
      name: "Assigned activities",
      route: [ 'tasks','assigned']
    },
    {
      name: "My activities",
      route: ['tasks','pending']
    },
    {
      name: "My waiver requests",
      route: ['waivers', 'status']
    },
    {
      name: "Remarked waivers",
      route: ['waivers','remarked']
    }
  ]

  private adminSidebar = [
    {
      name: "Waivers log",
      route: ['waivers','all']
    },
    {
      name: "Pending authorizations",
      route: ['authorizations','pending']
    },
    {
      name: "My approved WR",
      route: ['authorizations','approved']
    }
  ]

  constructor(private router: Router,
              private loginService : AuthenticationService) { }

  ngOnInit(): void {
    this.selectedIndex = + sessionStorage.getItem('index') || 0;
    $("#menu-toggle").click((e)=> {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    this.user = this.loginService.getUser();
    if(this.user.position == 'developer'){
      this.sidebar = this.userSidebar.concat(this.adminSidebar);
    }
    else if(this.user.position == 'employee'){
      this.sidebar = this.userSidebar;
    }else{
      this.sidebar = this.adminSidebar;
    }
}

  goTo(route : any , i: any){
    this.router.navigate(route);
    this.selectedIndex = i;
    sessionStorage.setItem('index',i);
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['authentication','login']);
    sessionStorage.removeItem('index');
  }

}
