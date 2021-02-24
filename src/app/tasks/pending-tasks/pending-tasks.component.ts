import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss']
})
export class PendingTasksComponent implements OnInit {

  public numbers = Array(5).fill(0).map((x,i)=>i);

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToWaiver(id){
    this.router.navigate(['waivers','view',id]);
  }

}
