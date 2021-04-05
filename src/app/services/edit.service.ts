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
    let waiver = this.waiverService.getWaiver();
    if(waiver == null || waiver['number'] != waiverId){
      return this.waiverService.loadWaiverGuard(this.number);
    }
    return waiver;
  }

  getWaiver(){
    this.wr = this.waiverService.getWaiver();
    return this.wr;
  }

  changeDetails(body){
    console.log(body);
    this.wr.area = body.area;
    this.wr.customer = body.customer;
    this.wr.typeNumber = body.typeNumber;
    this.wr.requiresManager = body.requiresManager;
    if(body.lapse == 'quantity'){
      this.wr.quantity = body.quantity;
      this.wr.specification = body.specification;
      this.wr.startDate = null;
      this.wr.endDate = null;
    }else{
      this.wr.quantity = null;
      this.wr.specification = null;
      this.wr.startDate = body.startDate;
      this.wr.endDate = body.endDate;
    }
    this.wr.type = body.type;
    if(this.wr.type == 'external'){
      this.wr.externalAuthorization = {};
      this.wr.externalAuthorization.title = body.extTitle;
      this.wr.externalAuthorization.name = body.extName;
      this.wr.externalAuthorization.date = body.extDate;
      this.wr.externalAuthorization.comments = body.extComments;
    }
  }

  changePieces(pieces){
    console.log(pieces);
    this.wr.parts = [];
    pieces.forEach(p => {
      const piece = {
        interplexPN : p.internal,
        customerPN : p.external
      }
      this.wr.parts.push(piece);
    });
  }

  changeRisks(body){
    Object.keys(body).forEach(k => {
      this.wr[k] = body[k]; 
    });
  }

  changeWaivers(waivers){
    console.log(waivers);
    this.wr.waivers = [];
    waivers.forEach(w => {
      this.wr.waivers.push(w);
    });
  }
}
