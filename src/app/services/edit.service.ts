import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { GetWaiverService } from './get-waiver.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  public wr: any;
  public number: string;

  constructor(public waiverService: GetWaiverService,
              private datePipe : DatePipe) {
  }

  isValid(waiverId : string) {
    this.number = waiverId;
    let waiver = this.waiverService.getWaiver();
    if(waiver == null || waiver['number'] != waiverId){
      return this.waiverService.loadWaiverGuard(this.number);
    }
    return true;
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
    this.wr.parts = [];
    pieces.forEach(p => {
      const piece = {
        interplexPN : p.internal,
        customerPN : p.customer
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
    this.wr.waivers = [];
    waivers.forEach(w => {
      this.wr.waivers.push(w);
    });
  }

  private isModified(action){
    let isEqual = true;
    let i = 0;
    this.wr.actions.forEach((act,index)=>{
      if(act.id == action.id){
        console.log(act.description + ' - ' + action.action);
        console.log(this.datePipe.transform(act.date,'yyyy-MM-dd') + ' - ' + action.date);
        console.log(act.responsable + ' - ' + action.username);

        isEqual = act.description == action.action &&
                  this.datePipe.transform(act.date,'yyyy-MM-dd')  == action.date &&
                 act.responsable == action.username;

        if(!isEqual){
          i = index;
        }
        return;
      }
    });
    if(i!=0){
      this.wr.actions.splice(i,1);
    }
    console.log('Is modified ' + !isEqual);
    return  !isEqual;
  }

  changeActions(actions){
    let newActions = [];
    let modifiedActions = [];
    let equalActions = [];

    actions.forEach((action)=>{

      const act = {
        responsable : action['username'],
        date : action['date'],
        description : action['action'],
        name : action['responsable'],
        id : action['id']
      };

      console.log(act);

      if(action.id == 0){
        console.log('New action');
        newActions.push(act);
      }else if(this.isModified(action)){
        console.log('Modified actions')
        modifiedActions.push(act);
      }else{
        console.log('Equal action');
        equalActions.push(act);
      }

    });
    
    console.log('Equal actions');
    console.log(equalActions);

    console.log('New Actions');
    console.log(newActions);
    
    console.log('Modified actions');
    console.log(modifiedActions);

    this.wr['actions'] = equalActions;
    this.wr['newActions'] = newActions;
    this.wr['modifiedActions'] = modifiedActions;
  }

  prepare(){
    this.wr?.newActions?.forEach(a=>{
      delete a.name;
      delete a.id;
    });
  }
}
