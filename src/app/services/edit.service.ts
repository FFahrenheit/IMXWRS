import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Authorization } from '../interfaces/create-wr.interface';
import { GetWaiverService } from './get-waiver.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EditService {

  public wr: any;
  public number: string;

  constructor(public waiverService: GetWaiverService,
              private datePipe : DatePipe,
              private http : HttpClient) {
  }

  update(){
    this.prepare();
    return this.http.put(`${ base_url }/waiver` , this.wr)
               .pipe(
                 map((resp:any)=>{
                   console.log(resp);
                   return true;
                 }),
                 catchError(error=>{
                   console.log(error);
                   return of(false);
                 })
               );
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
    this.wr.area = body.area;
    this.wr.customer = body.customer;
    this.wr.typeNumber = body.typeNumber;
    this.wr.requiresManager = body.needsManager;
    
    this.wr.expiration = {};

    if(body.lapse == 'quantity'){
      this.wr.expiration.quantity = body.quantity;
      this.wr.expiration.specification = body.specification;
      delete this.wr.expiration.startDate;
      delete this.wr.expiration.endDate;
    }else{
      delete this.wr.expiration.quantity;
      delete this.wr.expiration.specification;
      this.wr.expiration.startDate = body.startDate;
      this.wr.expiration.endDate = body.endDate;
    }
    this.wr.type = body.type;
    if(this.wr.type == 'external'){
      this.wr.externalAuthorization = {};
      this.wr.externalAuthorization.title = body.extTitle;
      this.wr.externalAuthorization.name = body.extName;
      this.wr.externalAuthorization.dateSigned = body.extDate;
      this.wr.externalAuthorization.comment = body.extComments;
    }else{
      delete this.wr?.externalAuthorization;
    }

    this.getManagers().subscribe((resp)=>{
      console.log('Got managers');
    },error=>{
      console.log('Failing managers: ' + error);
    })

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
    return  !isEqual;
  }

  changeActions(actions){
    let newActions = [];
    let modifiedActions = [];
    let equalActions = [];

    actions.forEach((action)=>{

      console.log(action);

      const act = {
        responsable : action['username'],
        date : action['date'],
        description : action['action'],
        name : action['responsable'],
        id : action['id']
      };

      if(action.id == 0){
        act['signed'] = 'New';
        newActions.push(act);
      }else if(this.isModified(action)){
        act['signed'] = 'Modified';
        modifiedActions.push(act);
      }else{
        act['signed'] = 'No changes';
        equalActions.push(act);
      }

    });
    
    console.log('Equal actions');
    console.log(equalActions);

    console.log('New Actions');
    console.log(newActions);
    
    console.log('Modified actions');
    console.log(modifiedActions);

    this.wr['equalActions'] = equalActions;
    this.wr['newActions'] = newActions;
    this.wr['modifiedActions'] = modifiedActions;
  }

  getManagers(){
    let type = this.wr.typeNumber.toString();
    let needsManager =  this.wr.requiresManager.toString();
    let params = new HttpParams();

    params = params.append('number', type);
    params = params.append('needsManager', needsManager);

    return this.http.get(`${ base_url }/waivers/authorizations`,{
      params: params
    }).pipe(
        map( (resp:any)=>{
          console.log(resp);
          this.wr.authorizations = [];
          resp.managers.forEach(m=>{
            const manager  = {
              name: m['name'],
              title: m['position'],
              manager: m['username'],
              signed: 'requires re-confirmation'
            }
            this.wr.authorizations.push(manager);
          });
        }),
        catchError((error)=>{
          console.log(error);
          return of(false);
        })
      );
  }

  prepare(){

    // this.wr?.newActions?.forEach(a=>{
    //   delete a.name;
    //   delete a.id;
    // });

    delete this.wr?.name;

    this.wr.status = 'pending';

    this.wr.authorizations?.forEach(a=>{
      delete a.name;
      delete a.position;
      delete a.title;
      delete a.signed;
    });

    let actions = [...(this.wr.newActions||[]),...(this.wr.modifiedActions||[])];

    actions.forEach(a=>{
      delete a?.id;
      delete a?.name;
      delete a?.signed;
    });

    this.wr.newActions = actions;

    delete this.wr?.modifiedActions;

    console.log(this.wr);
  }
}
