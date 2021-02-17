import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateWrService } from 'src/app/services/create-wr.service';

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
              private waiverService : CreateWrService) {
   }

  ngOnInit(): void {
    console.log(this.waiverService.wr);
    this.formDeviations = this.fb.group({
      deviations: this.fb.array([]),
    });

    this.riskDetails = this.fb.group({
      risk_analysis: ['', Validators.compose([Validators.required])],
      rpn_before : [0,Validators.compose([Validators.required])],
      rpn_after : [0,Validators.compose([Validators.required])],
      original_risk: ['', Validators.compose([Validators.required])],
      current_risk : ['', Validators.compose([Validators.required])],
      risk_with_actions: ['',Validators.compose([Validators.required])],
      required_action: ['',Validators.compose([Validators.required])],
      aux_action: [''] 
    });

    this.riskDetails.get('required_action').valueChanges.subscribe(action=>{
      if(action == 'other'){
        this.riskDetails.controls['aux_action'].setValidators([Validators.required]);
      }else{
        this.riskDetails.controls['aux_action'].clearValidators();
      }
      this.riskDetails.controls['aux_action'].updateValueAndValidity();
    });

    this.addDeviation();
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
    console.log(this.riskDetails.get('required_action').value);
    if(this.riskDetails.valid && this.formDeviations.valid){
      console.log('Valid');
    }else{
      console.log('Invalid');
      this.riskDetails.markAllAsTouched();
      this.formDeviations.markAllAsTouched();
    }
  }

  getStyle(field){
    if(!this.riskDetails.controls[field].touched){
      return '';
    }
    return (this.riskDetails.controls[field].valid) ? 'is-valid' : 'is-invalid';
  }

}
