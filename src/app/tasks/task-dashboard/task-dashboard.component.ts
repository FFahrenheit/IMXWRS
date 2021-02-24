import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  
  public numbers = Array(3).fill(0).map((x,i)=>i);

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  confirm(value){
    console.log(value);
  }

  sign(id){
    this.router.navigate(['waivers','sign',id]);
  }

}
