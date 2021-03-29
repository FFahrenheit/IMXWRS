import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcitiviesService } from 'src/app/services/acitivies.service';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  
  public activities;
  public today : any = new Date();

  constructor(public router : Router,
              private activityService : AcitiviesService) { }

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

  dateDiff(str){
    let date : any = new Date(str);
    let diff = (date.getTime() - this.today.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    console.log('Diff: ' + diffDays);
    return Math.round(diffDays);
  }

}
