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
      name: "My activities",
      route: [ 'activities']
    },
    {
      name: "Status of WR",
      route: ['waivers', 'status']
    },
    {
      name: "Check WR's",
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

}
