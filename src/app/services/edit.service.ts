import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileUpload } from '../interfaces/file.upload.interface';
import { GetWaiverService } from './get-waiver.service';
import { UploadFilesService } from './upload-files.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EditService {

  public wr: any;
  public number: string;
  public extAuthFile : FileUpload = null;
  public riskAnalysis: FileUpload = null;
  public authLock = false;

  constructor(public waiverService: GetWaiverService,
              private datePipe : DatePipe,
              private http : HttpClient,
              private upload : UploadFilesService) {
  }

  update(){ 
    return this.uploadFiles();
  }

  isValid(waiverId : string) {
    this.number = waiverId;
    let waiver = this.waiverService.getWaiver();
    if(waiver == null || waiver['number'] != waiverId){
      return this.waiverService.loadWaiverGuardOnHold(this.number);
    }
    return true;
  }

  getWaiver(){
    this.wr = this.waiverService.getWaiver();
    
    this.wr.files = {
      risk : null,
      auth : null
    };

    this.wr.evidences.forEach(r => {
      if(r.description.includes("Risk analysis") && !this.wr.files.risk){
        this.wr.files.risk = r.filename;
      }

      if(r.description.includes("External Authorization evidence") && !this.wr.files.auth){
        this.wr.files.auth = r.filename;
      }
    });

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

    console.log({
      actions
    });

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
        act['signed'] = '*New';
        newActions.push(act);
      }else if(this.isModified(action)){
        act['signed'] = '*Modified';
        modifiedActions.push(act);
      }else{
        act['signed'] = 'No changes';
        equalActions.push(act);
      }

    });

    console.log({
      'equal': equalActions,
      'new' : newActions,
      'modified' : modifiedActions
    });
    
    // console.log('Equal actions');
    // console.log(equalActions);

    // console.log('New Actions');
    // console.log(newActions);
    
    // console.log('Modified actions');
    // console.log(modifiedActions);

    this.wr['equalActions'] = equalActions;
    this.wr['newActions'] = newActions;
    this.wr['modifiedActions'] = modifiedActions;
  }

  getManagers(){
    let type = this.wr.typeNumber.toString();
    let needsManager =  this.wr.requiresManager.toString();
    let customer = this.wr.customer;
    let params = new HttpParams();

    params = params.append('number', type);
    params = params.append('needsManager', needsManager);
    params = params.append('customer',customer);

    return this.http.get(`${ base_url }/waivers/authorizations`,{
      params: params
    }).pipe(
        map( (resp:any)=>{
          console.log(resp);
          this.getAuthorizations(resp.managers);
        }),
        catchError((error)=>{
          console.log(error);
          return of(false);
        })
      );
  }

  getAuthorizations(managers){
    console.log({
      newManagers: managers,
      oldManagers: this.wr.authorizations
    });

    let oldAuth = this.wr.oldAuth || this.wr.authorizations;

    this.wr.oldAuth = oldAuth;
    
    let showAuth = [];
    let keepAuth = [];
    let newAuth = [];

    managers.forEach(m => {
      let repeated = false;
      if(!this.authLock){
        oldAuth.forEach(a => {
          if(a.position == m.position){
            repeated = true;
            showAuth.push(a);
            keepAuth.push(a.position);
          }
        });
      }
      if(!repeated){
        showAuth.push({
          name: m.name,
          position: m.position,
          signed: 'pending'
        });

        newAuth.push({
          manager: m.username,
          position: m.position,
          signed: 'pending',
        });
      }
    });

    console.log({
      showAuth,
      keepAuth,
      newAuth
    });

    this.wr.authorizations = showAuth;

    this.wr.newAuth = newAuth;
    this.wr.keepAuth = keepAuth;
    
    // this.wr.authorizations = [];
    // resp.managers.forEach(m=>{
    //   const manager  = {
    //     name: m['name'],
    //     title: m['position'],
    //     manager: m['username'],
    //     signed: 'requires re-confirmation'
    //   }
    //   let needs = false;
    //   this.wr.authorizations.push(manager);
    // });
  }

  prepare(){
    let saved = this.wr.authorizations;
    let wr = { ... this.wr };

    delete wr?.name;
    delete wr?.evidences;
    delete wr?.remarks;

    wr.status = 'pending';

    if(wr.type == 'external'){
      wr['externalAuthorization'] = { ... this.wr?.externalAuthorization };
    }

    let auth = [...(wr.authorizations||[])];
    let auth2 = [ ... auth ];
    delete wr.authorizations;

    console.log({
      auth, 
      auth2
    });

    auth.forEach(a=>{
      a.position = a.title;
      delete a?.name;
      delete a?.position;
      delete a?.title;
      delete a?.signed;
    });

    console.log({
      auth1: this.wr.authorizations
      ,auth2
    })

    wr.authorizations = auth;

    this.wr.authorizations = auth2;

    console.log({
      auth, 
      auth2
    });


    let actions = [...(wr.newActions||[]),...(wr.modifiedActions||[])];

    actions.forEach(a=>{
      delete a?.id;
      delete a?.name;
      delete a?.signed;
    });

    wr.newActions = actions;

    delete wr?.modifiedActions;

    console.log(wr);
    console.log(this.wr);

    this.wr.authorizations = saved;
    console.log({saved});
    return wr;
  }

  public attachExtAuth(file: File): void {
    if (file != null) {
      const _file: FileUpload = {
        description: 'External Authorization evidence rev. ' + (Number(this.wr.revision) + 1),
        file: file
      }
      this.extAuthFile = _file;
    } else {
      this.extAuthFile = null;
    }
  }

  public attachRiskAnalysis(file: File): void {
    if (file != null) {
      const _file: FileUpload = {
        description: 'Risk analysis rev. ' + (Number(this.wr.revision) + 1),
        file: file
      }
      this.riskAnalysis = _file;
    } else {
      this.riskAnalysis = null;
    }
  }
  
  public uploadFiles(){
    let calls = [];

    if (this.extAuthFile != null) {
      calls.push(
        this.upload.uploadFile(this.extAuthFile, this.number)
      );
    }

    if(this.riskAnalysis != null){
      calls.push(
        this.upload.uploadFile(this.riskAnalysis, this.number)
      );
    }

    calls.push(this.put());

    console.log(calls);

    return forkJoin(calls).pipe(
      map(resps=>{
        console.log(resps);
        let count = 0;
        resps.forEach(r =>{
          count += r['ok'] || 0;
        });
        console.log({
          count,
          length: resps.length
        })
        return count == resps.length;
      }), catchError(error=>{
        console.log(error);
        return of(false);
      })
    )
  }

  private put(){
    let waiver = this.prepare();
    return this.http.put(`${ base_url }/waiver` , waiver)
              //  .pipe(
              //    map((resp:any)=>{
              //      console.log(resp);
              //      return true;
              //    }),
              //    catchError(error=>{
              //      console.log(error);
              //      return of(false);
              //    })
              //  );
  }

  loadManagers(){
    this.getManagers().subscribe((resp)=>{
      console.log('Got managers');
    },error=>{
      console.log('Failing managers: ' + error);
    });
  }
}
