import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WaiversService } from 'src/app/services/waivers.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-my-waivers',
  templateUrl: './my-waivers.component.html',
  styleUrls: ['./my-waivers.component.scss']
})
export class MyWaiversComponent implements OnInit {

  public waivers;

  constructor(private router : Router,
              private waiverService : WaiversService,
              private alert : AlertService) { }

  ngOnInit(): void {
    this.waiverService.getMyWaivers()
        .subscribe(resp=>{
          if(resp){
            this.waivers = this.waiverService.getMyLog();
          }else{
            this.alert.error("Couldn't get waivers", { autoClose : false });
          }
        },error=>{
          this.alert.error("Couldn't load waivers", { autoClose: false });
        });
  }

  goToWaiver(id){
    this.router.navigate(['waivers','view',id]);
  }

}
