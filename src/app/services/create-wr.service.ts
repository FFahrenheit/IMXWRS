import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WR, FirstStep, Piece, SecondStep, Deviation, Action, Origin, Authorization } from '../interfaces/create-wr.interface';
import { FileUpload } from '../interfaces/file.upload.interface';
import { WExternalAuth, WaiverRequest, WAction, Waiver, WPart, Expiration, WaiverBody, Manager } from '../interfaces/waiver-request.interface';
import { UploadFilesService } from './upload-files.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CreateWrService {

  public wr: WR = {};
  public similar: [];
  public extAuthFile: FileUpload = null;
  public riskAnalysis: FileUpload = null;

  constructor(private http: HttpClient,
    private upload: UploadFilesService) {
  }

  getRepeated(body) {
    return this.http.post(`${base_url}/ia`, body)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          if (resp?.ok) {
            this.similar = resp?.coincidences;
            return true;
          }
          return false;
        },
          catchError(error => {
            console.log(error);
            return of(false);
          }))
      )
  }

  getSimilar() {
    return this.similar;
  }

  getManagers() {
    let type = this.wr.details.typeNo.toString();
    let needsManager = this.wr.details.needsManager.toString();
    let customer = this.wr.details.customer;
    let params = new HttpParams();

    params = params.append('number', type);
    params = params.append('needsManager', needsManager);
    params = params.append('customer', customer);

    console.log(params);

    return this.http.get(`${base_url}/waivers/authorizations`, {
      params: params
    }).pipe(
      map((resp: any) => {
        console.log(resp);
        this.wr.managers = [];
        resp.managers.forEach(m => {
          const manager: Authorization = {
            name: m['name'],
            position: m['position'],
            username: m['username']
          }
          this.wr.managers.push(manager);
        });
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  confirmWaiver(body: WaiverBody) {
    return this.http.post(`${base_url}/waivers`, body)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          if (resp['ok'] == true) {
            this.wr.number = resp['id'];
            return true;
          } 
          return false;
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      );
  }

  getRequest() {
    let actions: WAction[] = [];
    let waivers: Waiver[] = [];
    let parts: WPart[] = [];

    this.wr.actions.forEach(a => {
      let action: WAction = {
        date: a.date,
        description: a.action,
        responsable: a.username
      }
      actions.push(action);
    });

    this.wr.deviations.forEach(d => {
      let waiver: Waiver = {
        currentSpecification: d.current,
        reason: d.reason,
        requiredSpecification: d.required
      }
      waivers.push(waiver);
    });

    this.wr.pieces.forEach(p => {
      let part: WPart = {
        customerPN: p.customer,
        interplexPN: p.internal
      }
      parts.push(part);
    });

    let externalAuth: WExternalAuth;
    if (this.wr.details.externalAuthorization != null) {
      externalAuth = {
        dateSigned: this.wr.details.externalAuthorization.date,
        name: this.wr.details.externalAuthorization.name,
        title: this.wr.details.externalAuthorization.title,
        comment: this.wr.details.externalAuthorization.comment
      }
    }

    let expiration: Expiration;

    if (this.wr.details.appliesTo == 'quantity') {
      expiration = {
        quantity: this.wr.details.quantity,
        specification: this.wr.details.specification
      }
    }
    else {
      expiration = {
        startDate: this.wr.details.startDate,
        endDate: this.wr.details.endDate
      }
    }

    let waiver: WaiverRequest = {
      number: '',
      type: this.wr.details.type,
      typeNumber: this.wr.details.typeNo,
      area: this.wr.details.area,
      currentRisk: this.wr.risk.currentRisk,
      customer: this.wr.details.customer,
      originalRisk: this.wr.risk.originalRisk,
      originator: this.wr.origin.originator,
      requiredCorrectiveAction: this.wr.risk.requiredAction,
      requiresManager: this.wr.details.needsManager,
      riskAnalysis: this.wr.risk.riskAnalysis,
      riskWithActions: this.wr.risk.riskWithActions,
      rpnAfter: this.wr.risk.rpnAfter || 0,
      rpnBefore: this.wr.risk.rpnBefore || 0,
      status: 'pending',
    }
    
    let managers: Manager[] = [];

    this.wr.managers.forEach(m => {
      const manager: Manager = {
        manager: m.username,
        position: m.position
      }
      managers.push(manager);
    });

    let body: WaiverBody = {
      waiverRequest: waiver,
      actions: actions,
      deviations: waivers,
      externalAuth: externalAuth,
      parts: parts,
      expiration: expiration,
      managers: managers
    }

    return this.removeEmpty(body);
  }

  setFirstStep(fs: FirstStep) {
    this.wr.details = fs;
  }

  setPieces(pieces: Piece[]) {
    this.wr.pieces = pieces;
  }

  setSecondStep(risk: SecondStep) {
    this.wr.risk = risk;
  }

  setDeviations(deviations: Deviation[]) {
    this.wr.deviations = deviations;
  }

  setActions(actions: Action[]) {
    this.wr.actions = actions;
  }

  setOrigin(origin: Origin) {
    this.wr.origin = origin;
  }

  removeEmpty(obj) {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] === Object(obj[key])) newObj[key] = this.removeEmpty(obj[key]);
      else if (obj[key] !== undefined) newObj[key] = obj[key];
    });
    return newObj;
  };

  public attachExtAuth(file: File): void {
    if (file != null) {
      const _file: FileUpload = {
        description: 'External Authorization evidence',
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
        description: 'Risk analysis',
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
        this.upload.uploadFile(this.extAuthFile, this.wr.number)
      );
    }

    calls.push(
      this.upload.uploadFile(this.riskAnalysis, this.wr.number)
    );

    return forkJoin(calls).pipe(
      map(resps=>{
        let count = 0;
        resps.forEach(r =>{
          count += r['ok'];
        });
        return count == resps.length;
      }), catchError(error=>{
        console.log(error);
        return of(false);
      })
    )
  }
}