import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetWaiverService } from './get-waiver.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  public wr : any;

  constructor(public waiverService : GetWaiverService,
              private router : Router) { }

  isValid(){
    this.wr = this.waiverService.getWaiver();
    if(this.wr != null && this.wr.status == 'on hold'){
      return true;
    }
    this.router.navigate(['403']);
  }
}
