import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GetWaiverService } from 'src/app/services/get-waiver.service';

@Component({
  selector: 'waiver-actions',
  templateUrl: './waiver-actions.component.html',
  styleUrls: ['./waiver-actions.component.scss']
})
export class WaiverActionsComponent implements OnInit {

  @Input() public wr : any = null;
  public actions = [];
  public id : string;
  public username : string;

  constructor(private router : Router,
              private authService : AuthenticationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.wr != null){
   
      this.id = this.wr.number;
      this.username = this.authService.getUser().username;
  
      this.actions.push({
        action : 'View',
        link   : ['waivers','view',this.id]
      });
      
      this.loadPossibleActions();
    }
  }

  ngOnInit(): void {
  }

  /**
   * Possible actions:
   * View waiver * default 
   * Sign activity - loop 
   * Authorize waiver - loop 
   * Mark activity as done - loop  
   * Edit waiver *  if it's originator
   * Close waiver * if it's originator
   * Reopen waiver * if it's originator
   */
  loadPossibleActions(){
    
    if(this.wr.originator == this.username){ //Edit, close
      
      if(this.wr.status == 'on hold'){
        
        this.actions.push({
          action : 'Edit',
          link   : ['waivers','edit',this.id]
        });
      }else if(this.wr.status == 'open'){
        
        this.actions.push({
          action : 'Close',
          link   : ['waivers','close',this.id]
        });
      }
      
      if(this.wr.typeNumber == 4 && this.wr.originator == this.username
          && (this.wr.status == 'open' || this.wr.status == 'closed')){

            this.actions.push({
              action : 'Reopen',
              link   : ['waivers','reopen',this.id]
            });
      }
    }

    this.wr.authorizations.forEach(a =>{

      if(a['manager'] == this.username && a['signed'] == 'pending'){
        
        this.actions.push({
          action : 'Review authorization',
          link   : ['waivers','authorize',this.id]
        });

      }
    });

    this.wr.actions.forEach(a=>{
      
      if(a['responsable'] == this.username){

        if(a['signed'] == 'pending'){

          this.actions.push({
            action : 'Confirm participation',
            link   : ['waivers','sign',this.id]
          });
        }else if(a['signed'] == 'signed' && this.wr.status == 'open'){

          this.actions.push({
            action : 'Mark activities as done',
            link   : ['tasks','pending'] 
          });
        }
      }
    });
  }

  goTo(link : string[]){
    this.router.navigate(link);
  }

}
