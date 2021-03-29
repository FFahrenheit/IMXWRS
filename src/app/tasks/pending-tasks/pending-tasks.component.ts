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

  public activities; 
  public today : any = new Date();

  constructor(private router : Router,
              private activitiesService : AcitiviesService,
              private alert : AlertService) { }

  ngOnInit(): void {
    this.activitiesService.getMyTasks()
        .subscribe(resp=>{
          if(resp){
            this.activities = this.activitiesService.getPending();
          }
        },error=>{
          console.log(error);
        });
  }

  goToWaiver(id){
    this.router.navigate(['waivers','view',id]);
  }

  confirm(id){
    this.activitiesService.signActivity(id)
        .subscribe(resp=>{
          window.scroll(0,0);
          if(resp){
            this.ngOnInit();
            this.alert.success('Task done');
          }else{
            this.alert.error("Can not mark task as done. Refresh and try again");
          }
        },error=>{
          window.scroll(0,0);
          this.alert.error("Can not mark task as done. Try later");
        });
  }
  
  dateDiff(str){
    let date : any = new Date(str);
    let diff = (date.getTime() - this.today.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    console.log('Diff: ' + diffDays);
    return Math.round(diffDays);
  }

}
