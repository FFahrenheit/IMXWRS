import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecondStep } from 'src/app/interfaces/create-wr.interface';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Component({
  selector: 'app-risk-analysis',
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.scss']
})
export class RiskAnalysisComponent implements OnInit {

  riskDetails : FormGroup = Object.create(null);
  
  private riskAnalysis : File;
  private files : File[] = [];

  public loadedFiles;

  constructor(private fb : FormBuilder,
              private router : Router,
              private waiverService : CreateWrService) {
   }

   ngOnDestroy(){
      this.waiverService.setSecondStep(this.getForm());
      if(this.riskAnalysis != null){
        this.waiverService.attachRiskAnalysis(this.riskAnalysis);
      }
      if(this.files.length>0){
        this.waiverService.setResources(this.files);
      }
      this.router.navigate(['create','confirm']);
   }

  ngOnInit(): void {
    console.log(this.waiverService.wr);

    this.riskDetails = this.fb.group({
      risk_analysis: [this.waiverService.wr.risk?.riskAnalysis || '', Validators.compose([Validators.required])],
      rpn_before : [this.waiverService.wr.risk?.rpnBefore || '0',Validators.compose([Validators.required])],
      rpn_after : [this.waiverService.wr.risk?.rpnAfter || '0',Validators.compose([Validators.required])],
      original_risk: [this.waiverService.wr.risk?.originalRisk || '', Validators.compose([Validators.required])],
      current_risk : [this.waiverService.wr.risk?.currentRisk || '', Validators.compose([Validators.required])],
      risk_with_actions: [this.waiverService.wr.risk?.riskWithActions || 'deleted',Validators.compose([Validators.required])],
      required_action: [this.getRequiredAction() || '',Validators.compose([Validators.required])],
      aux_action: [this.waiverService.wr.risk?.requiredAction ||''] 
    });

    this.loadedFiles = this.waiverService?.resources || [];

    this.riskDetails.get('required_action').valueChanges.subscribe(action=>{
      if(action == 'other'){
        this.riskDetails.controls['aux_action'].setValidators([Validators.required]);
      }else{
        this.riskDetails.controls['aux_action'].clearValidators();
      }
      this.riskDetails.controls['aux_action'].updateValueAndValidity();
    });

  }

  public fileEvent($event){
    if ($event.target.files.length > 0) {
      this.riskAnalysis = $event.target.files[0] as File;
      this.riskDetails.controls['risk_analysis'].setValue(this.riskAnalysis.name);
    }else{
      this.riskAnalysis = $event.target.files[0] as File;
      this.riskDetails.controls['risk_analysis'].setValue('');
    }
  }

  getRequiredAction(){
    if(this.waiverService.wr.risk?.requiredAction == null
      || typeof this.waiverService.wr.risk?.requiredAction == 'undefined'){
      return '';
    }else{
      let action = this.waiverService.wr.risk.requiredAction;
      if(action != 'PDCA' && action != '8DS' && action != 'A3'){
        return 'other';
      }
      return action;
    }
  }


  next(){
    if(this.riskDetails.valid){
      this.ngOnDestroy();
    }else{
      this.riskDetails.markAllAsTouched();
    }
  }

  getForm(){
    const risk : SecondStep = {
      riskAnalysis : this.getVal('risk_analysis'),
      rpnBefore : this.getVal('rpn_before'),
      rpnAfter : this.getVal('rpn_after'),
      originalRisk : this.getVal('original_risk'),
      currentRisk : this.getVal('current_risk'),
      riskWithActions : this.getVal('risk_with_actions'),
      requiredAction : (this.getVal('required_action') == 'other') ? this.getVal('aux_action') : this.getVal('required_action')
    };

    return risk;
  }

  getVal(field){
    return this.riskDetails.controls[field].value;
  }

  getStyle(field){
    if(!this.riskDetails.controls[field].touched){
      return '';
    }
    return (this.riskDetails.controls[field].valid) ? 'is-valid' : 'is-invalid';
  }

  getFiles($event){
    console.log($event);
    this.files = $event;
  }

}
