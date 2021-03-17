import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcitiviesService } from 'src/app/services/acitivies.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss']
})
export class PendingTasksComponent implements OnInit {

  public numbers = Array(5).fill(0).map((x,i)=>i);
  public activities = []; 

  constructor(private router : Router,
              private activitiesService : AcitiviesService,
              private alert : AlertService,
              private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.activitiesService.getMyTasks()
        .subscribe(resp=>{
          if(resp){
            this.activities = this.activitiesService.getPending();
          }
        },error=>{
          console.log(error);
        })
  }

  goToWaiver(id){
    this.router.navigate(['waivers','view',id]);
  }

  confirm(id){
    this.activitiesService.signActivity(id)
        .subscribe(resp=>{
          if(resp){
            this.ngOnInit();
            this.alert.success('Task done');
          }else{
            this.alert.error("Can not mark task as done. Refresh and try again");
          }
        },error=>{
          this.alert.error("Can not mark task as done. Try later");
        });
  }

}
