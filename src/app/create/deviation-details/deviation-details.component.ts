import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deviation-details',
  templateUrl: './deviation-details.component.html',
  styleUrls: ['./deviation-details.component.scss']
})
export class DeviationDetailsComponent implements OnInit {

  formDeviations : FormGroup = Object.create(null);
  riskDetails : FormGroup = Object.create(null);

  constructor(private fb : FormBuilder,
              private router : Router) {
   }

  ngOnInit(): void {
    this.formDeviations = this.fb.group({
      deviations: this.fb.array([]),
    });

    this.riskDetails = this.fb.group({
      original_risk: ['low', Validators.compose([Validators.required])],
      current_risk : ['low', Validators.compose([Validators.required])],
      risk_with_actions: ['low',Validators.compose([Validators.required])],
      required_action: ['8DS',Validators.compose([Validators.required])],
      aux_action: ['', Validators.compose([Validators.required])] 
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
  }

}
