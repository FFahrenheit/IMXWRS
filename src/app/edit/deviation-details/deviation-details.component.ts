import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-deviation-details',
  templateUrl: './deviation-details.component.html',
  styleUrls: ['./deviation-details.component.scss']
})
export class DeviationDetailsComponent implements OnInit {

  formDeviations : FormGroup = Object.create(null);
  riskDetails : FormGroup = Object.create(null);

  constructor(private fb : FormBuilder,
              private router : Router,
              private waiverService : EditService) {
   }

   ngOnDestroy(){
      //this.waiverService.setSecondStep(this.getForm());
      //this.waiverService.setDeviations(this.getDeviations());
      //this.router.navigate(['create','actions']);
   }

  ngOnInit(): void {

    this.formDeviations = this.fb.group({
      deviations: this.fb.array([]),
    });

    this.riskDetails = this.fb.group({
      riskAnalysis: [this.waiverService.wr?.riskAnalysis || '', Validators.compose([Validators.required])],
      rpnBefore : [this.waiverService.wr?.rpnBefore || '0',Validators.compose([Validators.required])],
      rpnAfter : [this.waiverService.wr?.rpnAfter || '0',Validators.compose([Validators.required])],
      originalRisk: [this.waiverService.wr?.originalRisk || '', Validators.compose([Validators.required])],
      currentRisk : [this.waiverService.wr?.currentRisk || '', Validators.compose([Validators.required])],
      riskWithActions: [this.waiverService.wr?.riskWithActions || '',Validators.compose([Validators.required])],
      requiredCorrectiveAction: [this.getRequiredAction() || '',Validators.compose([Validators.required])],
      auxAction: [this.waiverService.wr.risk?.requiredAction ||''] 
    });

    this.riskDetails.get('requiredCorrectiveAction').valueChanges.subscribe(action=>{
      if(action == 'other'){
        this.riskDetails.controls['auxAction'].setValidators([Validators.required]);
      }else{
        this.riskDetails.controls['auxAction'].clearValidators();
      }
      this.riskDetails.controls['auxAction'].updateValueAndValidity();
    });
    

    if(this.waiverService.wr?.waivers == null || this.waiverService.wr.waivers.length == 0){
      this.addDeviation();
    }else{
      this.waiverService.wr.deviations.forEach(d=>{
        const deviation = this.fb.group({
          currentSpecification: [ d.currentSpecification ||'', Validators.compose([Validators.required])],
          requiredSpecification: [ d.requiredSpecification || '', Validators.compose([Validators.required])],
          reason: [d.reason || '', Validators.compose([Validators.required])]
        });
    
        this.deviations.push(deviation);
      });
    }

  }

  getRequiredAction(){
    if(this.waiverService.wr.risk?.requiredAction == null){
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
      currentSpecification: [ '', Validators.compose([Validators.required])],
      requiredSpecification: [ '', Validators.compose([Validators.required])],
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

  getDeviations(){
    let deviations = [];
    this.deviations.value.forEach(d=>{
      const deviation  = {
        current : d['currentSpecification'],
        required : d['requiredSpecification'],
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
