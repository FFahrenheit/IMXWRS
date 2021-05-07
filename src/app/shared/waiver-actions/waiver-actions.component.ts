import { Component, OnInit } from '@angular/core';
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

  public wr : any;
  public actions = [];
  public id : string;
  public username : string;

  constructor(private router : Router,
              private waiverService : GetWaiverService,
              private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.wr = this.waiverService.getWaiver();
    this.id = this.wr.number;
    this.username = this.authService.getUser().username;

    console.log(['Waiver received',this.wr]);
    
    this.actions.push({
      action : 'View',
      link   : ['waivers','view',this.id]
    });
    
    this.loadPossibleActions();
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
    return;

  }

  click(){
    console.log('xd');
  }

}
