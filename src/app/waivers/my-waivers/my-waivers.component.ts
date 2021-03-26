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
    this.filter();
  }

  goToWaiver(id){
    this.router.navigate(['waivers','view',id]);
  }

  filter(data = ''){
    this.waiverService.getWaiverLog(data)
    .subscribe(
      resp=>{
        if(resp){
          this.waivers = this.waiverService.getLog();
        }else{
          this.alert.error("Couldn't load waivers, try again",{ autoClose : false });
        }
      },error=>{
        this.alert.error("Couldn't load waivers",{ autoClose : false });
      }
    );
  }
}
