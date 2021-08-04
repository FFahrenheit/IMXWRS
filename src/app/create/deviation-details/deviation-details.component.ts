import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Deviation, SecondStep } from 'src/app/interfaces/create-wr.interface';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Component({
  selector: 'app-deviation-details',
  templateUrl: './deviation-details.component.html',
  styleUrls: ['./deviation-details.component.scss']
})
export class DeviationDetailsComponent implements OnInit, OnDestroy {

  formDeviations : FormGroup = Object.create(null);
  riskDetails : FormGroup = Object.create(null);
  
  private riskAnalysis : File;

  constructor(private fb : FormBuilder,
              private router : Router,
              private waiverService : CreateWrService) {
   }

   ngOnDestroy(){
      this.waiverService.setSecondStep(this.getForm());
      this.waiverService.setDeviations(this.getDeviations());
      this.waiverService.attachRiskAnalysis(this.riskAnalysis);
      this.router.navigate(['create','actions']);
   }

  ngOnInit(): void {
    console.log(this.waiverService.wr);
    this.formDeviations = this.fb.group({
      deviations: this.fb.array([]),
    });

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

    this.riskDetails.get('required_action').valueChanges.subscribe(action=>{
      if(action == 'other'){
        this.riskDetails.controls['aux_action'].setValidators([Validators.required]);
      }else{
        this.riskDetails.controls['aux_action'].clearValidators();
      }
      this.riskDetails.controls['aux_action'].updateValueAndValidity();
    });

    if(this.waiverService.wr?.deviations == null || this.waiverService.wr.deviations.length == 0){
      this.addDeviation();
    }else{
      this.waiverService.wr.deviations.forEach(d=>{
        const deviation = this.fb.group({
          current: [ d.current ||'', Validators.compose([Validators.required])],
          required: [ d.required || '', Validators.compose([Validators.required])],
          reason: [d.reason || '', Validators.compose([Validators.required])]
        });
    
        this.deviations.push(deviation);
      });
    }

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

  get deviations(): FormArray {
    return this.formDeviations.get('deviations') as FormArray;
  }

  addDeviation(){
    const deviation = this.fb.group({
      current: [ '', Validators.compose([Validators.required])],
      required: [ '', Validators.compose([Validators.required])],
      reason: ['', Validators.compose([Validators.required])]
    });

    this.deviations.push(deviation);
  }

  deleteDeviation(index): void {
    this.deviations.removeAt(index);
  }

  next(){
    if(this.riskDetails.valid && this.formDeviations.valid){
      this.ngOnDestroy();
    }else{
      this.riskDetails.markAllAsTouched();
      this.formDeviations.markAllAsTouched();
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

  getDeviations(){
    let deviations = [];
    this.deviations.value.forEach(d=>{
      const deviation : Deviation = {
        current : d['current'],
        required : d['required'],
        reason : d['reason'],
      }
      deviations.push(deviation);
    })

    return deviations;
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

  check(deviation : FormGroup, field : string) : string{
    if(!deviation.controls[field].touched){
      return '';
    }
    return deviation.controls[field].hasError('required') ? 'is-invalid' : 'is-valid';
  }

}
