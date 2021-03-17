import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcitiviesService } from 'src/app/services/acitivies.service';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  
  public numbers = Array(3).fill(0).map((x,i)=>i);

  public activities = [];

  constructor(public router : Router,
              private activityService : AcitiviesService,
              public datePipe : DatePipe) { }

  ngOnInit(): void {
    this.activityService.getMyActivities()
        .subscribe(res=>{
          if(res){
            this.activities = this.activityService.getUnsigned();
          }
        },error=>{
          console.log(error);
        });
  }

  sign(id){
    this.router.navigate(['waivers','sign',id]);
  }

}
