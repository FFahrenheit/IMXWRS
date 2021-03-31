import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationsService } from 'src/app/services/authorizations.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  public waiverId;
  public exists = false;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private alert : AlertService,
              private authorizationsService : AuthorizationsService) { 
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
    console.log($event);
  }
}
