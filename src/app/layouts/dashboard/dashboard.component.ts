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
      name: "Waivers log",
      route: [ 'waivers', 'all']
    },
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    $("#menu-toggle").click((e)=> {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
}

  goTo(route : any , i: any){
    this.router.navigate(route);
    this.selectedIndex = i;
  }

  logout(){
    this.router.navigate(['authentication','login']);
  }

}
