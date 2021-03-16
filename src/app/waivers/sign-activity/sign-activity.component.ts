import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';

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
              private signService : SignService) { 
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    })
  }

  confirm(){
    this.signService.signActivity(this.waiverId)
        .subscribe(resp=>{
          if(resp){
            this.router.navigate(['waivers','view',this.waiverId]);
          }
        },err=>{
          console.log(err);
        });
  }

  updateExistance($event){
    console.log('event : ' + $event);
    this.exists = $event;
  }
}
