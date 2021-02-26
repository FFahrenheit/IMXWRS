import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public shown = true;

  public selectedIndex = 0;

  public sidebar = [
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
  ]

  constructor(private router: Router) { 
    this.sidebar = [
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
  }

  ngOnInit(): void {
    this.selectedIndex = + sessionStorage.getItem('index') || 0;
    $("#menu-toggle").click((e)=> {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
}

  goTo(route : any , i: any){
    this.router.navigate(route);
    this.selectedIndex = i;
    sessionStorage.setItem('index',i);
  }

  logout(){
    this.router.navigate(['authentication','login']);
    sessionStorage.removeItem('index');
  }

}
