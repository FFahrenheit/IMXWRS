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
  // riskDetails : FormGroup = Object.create(null);
  number : string;

  constructor(private fb : FormBuilder,
              private router : Router,
              private editService : EditService) {
   }

   ngOnDestroy(){
      // this.editService.changeRisks(this.getForm());
      this.editService.changeWaivers(this.getDeviations());
      console.log(this.editService.wr);
      this.router.navigate(['edit',this.number,'actions']);
    }

  //  getForm(){
  //    let body = this.riskDetails.value;
  //    if(body.requiredCorrectiveAction == 'other'){
  //      body.requiredCorrectiveAction = body.auxAction;
  //    }
  //    delete body.auxAction;
  //    return body;
  //  }

  ngOnInit(): void {

    this.number = this.editService.getWaiver()['number'];

    this.formDeviations = this.fb.group({
      deviations: this.fb.array([]),
    });

    // this.riskDetails = this.fb.group({
    //   riskAnalysis: [this.editService.wr?.riskAnalysis || '', Validators.compose([Validators.required])],
    //   rpnBefore : [this.editService.wr?.rpnBefore || '0',Validators.compose([Validators.required])],
    //   rpnAfter : [this.editService.wr?.rpnAfter || '0',Validators.compose([Validators.required])],
    //   originalRisk: [this.editService.wr?.originalRisk || '', Validators.compose([Validators.required])],
    //   currentRisk : [this.editService.wr?.currentRisk || '', Validators.compose([Validators.required])],
    //   riskWithActions: [this.editService.wr?.riskWithActions || '',Validators.compose([Validators.required])],
    //   requiredCorrectiveAction: [this.getRequiredAction() || '',Validators.compose([Validators.required])],
    //   auxAction: [this.editService.wr?.requiredCorrectiveAction ||''] 
    // });

    // this.riskDetails.get('requiredCorrectiveAction').valueChanges.subscribe(action=>{
    //   if(action == 'other'){
    //     this.riskDetails.controls['auxAction'].setValidators([Validators.required]);
    //   }else{
    //     this.riskDetails.controls['auxAction'].clearValidators();
    //   }
    //   this.riskDetails.controls['auxAction'].updateValueAndValidity();
    // });
    

    if(this.editService.wr?.waivers == null || this.editService.wr.waivers.length == 0){
      this.addDeviation();
    }else{
      this.editService.wr.waivers.forEach(d=>{
        const deviation = this.fb.group({
          currentSpecification: [ d.currentSpecification ||'', Validators.compose([Validators.required])],
          requiredSpecification: [ d.requiredSpecification || '', Validators.compose([Validators.required])],
          reason: [d.reason || '', Validators.compose([Validators.required])]
        });
    
        this.deviations.push(deviation);
      });
    }

  }

  // getRequiredAction(){
  //   if(this.editService.wr?.requiredCorrectiveAction == null){
  //     return '';
  //   }else{
  //     let action = this.editService.wr?.requiredCorrectiveAction;
  //     if(action != 'PDCA' && action != '8DS' && action != 'A3'){
  //       return 'other';
  //     }
  //     return action;
  //   }
  // }

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
    if(/*this.riskDetails.valid && */this.formDeviations.valid){
      this.ngOnDestroy();
    }else{
      // this.riskDetails.markAllAsTouched();
      this.formDeviations.markAllAsTouched();
    }
  }

  getDeviations(){
    let deviations = [];
    this.deviations.value.forEach(d=>{
      const deviation  = {
        currentSpecification : d['currentSpecification'],
        requiredSpecification : d['requiredSpecification'],
        reason : d['reason'],
      }
      deviations.push(deviation);
    })

    return deviations;
  }

  // getVal(field){
  //   return this.riskDetails.controls[field].value;
  // }

  // getStyle(field){
  //   if(!this.riskDetails.controls[field].touched){
  //     return '';
  //   }
  //   return (this.riskDetails.controls[field].valid) ? 'is-valid' : 'is-invalid';
  // }

  check(deviation: FormGroup, field: string): string {
    console.log({
      deviation,
      field
    });
    if (!deviation.controls[field].touched) {
      return '';
    }
    return deviation.controls[field].hasError('required') ? 'is-invalid' : 'is-valid';
  }

  public scroll(): void {
    window.scrollTo(0, 0);
  }
}
