import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  
  public numbers = Array(3).fill(0).map((x,i)=>i);

  constructor() { }

  ngOnInit(): void {
  }

  confirm(value){
    console.log(value);
  }

}
