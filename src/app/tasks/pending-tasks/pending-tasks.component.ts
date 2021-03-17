import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcitiviesService } from 'src/app/services/acitivies.service';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss']
})
export class PendingTasksComponent implements OnInit {

  public numbers = Array(5).fill(0).map((x,i)=>i);
  public activities = []; 

  constructor(private router : Router,
              private activitiesService : AcitiviesService) { }

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
    this.ngOnInit();
  }

}
