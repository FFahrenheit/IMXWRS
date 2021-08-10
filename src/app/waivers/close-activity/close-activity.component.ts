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
  public files = [];

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
    setTimeout(() => {
      window.scroll(0,0);
    }, 10);

    this.signService.closeAction(this.activityId)
        .subscribe(resp=>{
          console.log(resp);
          if(resp){
            window.scroll(0,0);
            this.signService.uploadFiles(this.files, this.activityId, this.waiverId)
              .subscribe(resp=>{
              if(resp){
                this.alert.success('Action correctly closed');
                setTimeout(() => {
                  this.router.navigate(['waivers','view',this.waiverId]);
                }, 3500);
              }else{
                this.alert.error('Can not upload files to close action, please try again', { autoClose: true });
              }
            },error=>{
              this.alert.error('Can not upload files to close action, please try again', { autoClose: true });
            });

            // this.alert.success('Activity signed');
            // setTimeout(() => {
            //   this.router.navigate(['waivers','view',this.waiverId]);             
            // }, 3010);
          }else{
            this.alert.error('Can not close activity. Reload and try again', { autoClose: false });
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

  public getFiles($event) : void{
    this.files = $event;
    console.log(this.files);
  }

}
