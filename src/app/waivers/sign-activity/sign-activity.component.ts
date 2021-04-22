import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-sign-activity',
  templateUrl: './sign-activity.component.html',
  styleUrls: ['./sign-activity.component.scss']
})
export class SignActivityComponent implements OnInit {

  public waiverId;
  public exists = false;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private signService : SignService,
              private alert : AlertService) { 
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    })
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
