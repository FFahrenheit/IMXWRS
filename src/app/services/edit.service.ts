import { Injectable } from '@angular/core';
import { GetWaiverService } from './get-waiver.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  public wr: any;
  public number: string;

  constructor(public waiverService: GetWaiverService) {
  }

  isValid(waiverId : string) {
    this.number = waiverId;
    return this.waiverService.loadWaiverGuard(this.number);
  }
}
