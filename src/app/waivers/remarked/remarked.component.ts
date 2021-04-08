import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WaiversService } from 'src/app/services/waivers.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-remarked',
  templateUrl: './remarked.component.html',
  styleUrls: ['./remarked.component.scss']
})
export class RemarkedComponent implements OnInit {

  public waivers;
  public blockedList =  ['originator','status'];

  constructor(private router : Router,
              private waiverService : WaiversService,
              private alert : AlertService) { }

  ngOnInit(): void {
    this.filter({status: ''});
  }

  goToWaiver(id){
    this.router.navigate(['waivers','view',id]);
  }

  filter(data : any = ''){
    this.waiverService.getMyRemarks(data)
    .subscribe(
      resp=>{
        if(resp){
          this.waivers = this.waiverService.getMyRemarked();
        }else{
          this.alert.error("Couldn't load waivers, try again",{ autoClose : false });
        }
      },error=>{
        this.alert.error("Couldn't load waivers",{ autoClose : false });
      }
    );
  }

  goToEdit(id){
    this.router.navigate(['waivers','edit',id]);
  }

}
