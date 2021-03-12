import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authorization, Origin, WR } from 'src/app/interfaces/create-wr.interface';
import { WaiverBody } from 'src/app/interfaces/waiver-request.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public wr : WR;

  public placeholder = 'PLACEHOLDER';
  public numbers = Array(3).fill(0).map((x,i)=>i);
  public managers : Authorization[];

  constructor(private router : Router,
              private waiverService : CreateWrService,
              public datePipe : DatePipe,
              public loginService : AuthenticationService) { 
  }

  ngOnInit(): void {
    let origin : Origin = {
      originator: this.loginService.getUser().username,
      date :new Date(),
      number : 'TBD'
    };
    this.waiverService.setOrigin(origin);
    this.wr = this.waiverService.wr;
    this.waiverService.getManagers().subscribe((resp)=>{
      this.managers = this.wr.managers;
    },error=>{
      console.log('Failing managers: ' + error);
    })
  }

  confirm(){
    let waiver = this.waiverService.getRequest() as WaiverBody;
    console.log(waiver);
    this.waiverService.confirmWaiver(waiver).subscribe((resp)=>{
      if(resp){
        this.waiverService.wr = null;
        this.router.navigate(['waivers','view',this.wr.number]);
      }else{
        console.log('error'+ resp);
      }
    },(err)=>{
      console.log(err);
    }); 
  }

}