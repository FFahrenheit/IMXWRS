import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationsService } from 'src/app/services/authorizations.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-pending-authorizations',
  templateUrl: './pending-authorizations.component.html',
  styleUrls: ['./pending-authorizations.component.scss']
})
export class PendingAuthorizationsComponent implements OnInit {

  public authorizations;

  constructor(private router : Router,
              private authorizationService : AuthorizationsService,
              private alert : AlertService) { }

  ngOnInit(): void {
    this.authorizationService.loadPendingAuthorizations()
        .subscribe(resp=>{
          if(resp){
            this.authorizations = this.authorizationService.getPendingAuthorizations();
            console.log(this.authorizations);
          }else{
            this.alert.error("Couldn't load authorizations. Try again",{ autoClose: false });
          }
        },error=>{
          this.alert.error("Couldn't load authorizations. Server error",{ autoClose: false });
        })
  }

  goToWaiver(id : string){
    this.router.navigate(['waivers','authorize',id])
  }

}
