import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationsService } from 'src/app/services/authorizations.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-approved-waivers',
  templateUrl: './approved-waivers.component.html',
  styleUrls: ['./approved-waivers.component.scss']
})
export class ApprovedWaiversComponent implements OnInit {

  public authorizations = [];

  constructor(private router : Router,
              private alert : AlertService,
              private authorizationsService : AuthorizationsService,
              private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.authorizationsService.loadRecent()
        .subscribe(resp=>{
          if(resp){
            this.authorizations = this.authorizationsService.getRecentAuthorizations();
            console.log(this.authorizations);
            }else{
              this.alert.error("Couldn't load waivers", { autoClose: false });
            }
        },error=>{
          this.alert.error("Server error", { autoClose: false });
        });
  }

  goToWaiver(id){
    this.router.navigate(['waivers','view',id]);
  }


}
