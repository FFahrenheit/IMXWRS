import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthorizationsService } from 'src/app/services/authorizations.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  public waiverId : string;
  public exists = false;
  public wr;
  public cannotApprove = true;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private alert : AlertService,
              private authorizationsService : AuthorizationsService,
              private loginService : AuthenticationService) { 
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    })
  }

  updateExistance($event){
    this.exists = $event;  
  }

  confirm(){
    this.authorizationsService.authorizeWaiver(this.waiverId)
        .subscribe(resp=>{
          window.scroll(0,0);
          if(resp){
            this.alert.success('Waiver authorized');
            setTimeout(()=>{
              this.router.navigate(['waivers','view',this.waiverId]);
            },3010);
          }else{
            this.alert.error("Could't authorize waiver. Try again please");
          }
        },error=>{
          window.scroll(0,0);
          this.alert.error("Server error. Try again later");
        });
  }

  sendComment($event){
    window.scroll(0,0);
    this.alert.info('Adding remark...');
    let body = {
      comment: $event,
      request: this.waiverId
    };
    this.authorizationsService.addRemark(body)
        .subscribe(resp=>{
          if(resp){
            setTimeout(() => {
              this.alert.success("Remark sent");
            }, 1600);

            setTimeout(() => {
              window.location.reload();//Restart the component
            }, 3200);
          }else{
            this.alert.error("Couldn't send remark. Try again");
          }
        },error=>{
          this.alert.error("Couldn't remark waiver. Try again");
        });
  }

  getWaiver($event){
    this.wr = $event;
    this.wr.remarks?.forEach( r => {
      if(r.manager == this.loginService.getUser().username){
        this.cannotApprove = true; //!!!ASK BEFORE
        return;
      }
    });
    this.cannotApprove = true; // ^^^^ CHANGE
  }
}
