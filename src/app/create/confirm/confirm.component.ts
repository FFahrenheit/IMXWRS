import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Origin, WR } from 'src/app/interfaces/create-wr.interface';
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
  }

  confirm(){
    let waiver = this.waiverService.getRequest() as WaiverBody;
    console.log(waiver);
    this.waiverService.confirmWaiver(waiver).subscribe((resp)=>{
      if(resp){
        console.log("wwuuu");
      }else{
        console.log('error'+ resp);
      }
    },(err)=>{
      console.log(err);
    }); 
  }

}