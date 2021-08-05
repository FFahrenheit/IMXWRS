import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-close-activity',
  templateUrl: './close-activity.component.html',
  styleUrls: ['./close-activity.component.scss']
})
export class CloseActivityComponent implements OnInit {

  public waiverId : string; 
  public exists = false;
  public activityId : string;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private signService : SignService,
              private alert : AlertService) { 
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
      this.activityId = params.get('activity');

      console.log({
        waiver: this.waiverId,
        activity: this.activityId
      })
    });
  }

  confirm(){
    this.signService.signActivity(this.waiverId)
        .subscribe(resp=>{
          console.log(resp);
          if(resp){
            window.scroll(0,0);
            this.alert.success('Activity signed');
            setTimeout(() => {
              this.router.navigate(['waivers','view',this.waiverId]);             
            }, 3010);
          }else{
            this.alert.error('Can not sign activity. Reload and try again', { autoClose: false });
          }
        },err=>{
          this.alert.error('Server error');
          console.log(err);
        });
  }

  updateExistance($event){
    console.log('Existance = ' + $event);
    this.exists = $event;
  }

}
