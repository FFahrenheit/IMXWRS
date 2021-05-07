import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authorization, Origin, WR } from 'src/app/interfaces/create-wr.interface';
import { WaiverBody } from 'src/app/interfaces/waiver-request.interface';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CreateWrService } from 'src/app/services/create-wr.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public wr : WR;
  public managers : Authorization[];
  public user : User;
  public repeated = [];

  constructor(private router : Router,
              private waiverService : CreateWrService,
              public datePipe : DatePipe,
              public loginService : AuthenticationService,
              private alert : AlertService) { 
  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();

    let origin : Origin = {
      originator: this.user.username,
      date :new Date(),
      number : 'To be assigned'
    };
    
    this.waiverService.setOrigin(origin);
    this.wr = this.waiverService.wr;
    
    this.waiverService.getManagers().subscribe((resp)=>{
      this.managers = this.wr.managers;
    },error=>{
      console.log('Failing managers: ' + error);
    });

    this.getRepeated();
  }

  confirm(){
    let waiver = this.waiverService.getRequest() as WaiverBody;
    console.log(waiver);
    this.waiverService.confirmWaiver(waiver).subscribe((resp)=>{
      if(resp){
        window.scroll(0,0);
        this.alert.success('Waiver sucessfully created');
        setTimeout(() => {
          this.waiverService.wr = {} as WR;
          this.router.navigate(['waivers','view',this.wr.number]);
        }, 3500);
      }else{
        this.alert.error('Can not create WR, please try again', { autoClose: true });
      }
    },(err)=>{
      this.alert.error('Server error',{ autoClose: true })
      console.log(err);
    }); 
  }

  getRepeated(){
    let parts = [];
    this.wr.pieces.forEach(p=>{
      const piece = {
        'customerPN' : p.customer,
        'interplexPN' : p.internal
      };
      parts.push(piece);
    });

    const body = {
      'type' : this.wr.details.type,
      'customer' : this.wr.details.customer,
      'parts' : parts
    };

    this.waiverService.getRepeated(body)
        .subscribe(resp=>{
          if(resp){
            this.repeated = this.waiverService.getSimilar();
          }else{
            this.alert.error("Couldn't get repeated");
          }
        },error=>{
          this.alert.error("Failed retrieving repeated waivers");
        });
  }
}