import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.scss']
})
export class ActionPlanComponent implements OnInit {

  public actionPlan : FormGroup = Object.create(null);

  constructor(private fb : FormBuilder,
              private router : Router,
              private waiverService : CreateWrService) { 
  }

  ngOnInit(): void {
    this.actionPlan = this.fb.group({
      actions: this.fb.array([])
    });
    this.addAction();

    console.log(this.waiverService.wr);
  }

  
  get actions(): FormArray {
    return this.actionPlan.get('actions') as FormArray;
  }

  addAction(){
    const action = this.fb.group({
      responsable: [ '', Validators.compose([Validators.required])],
      action: [ '', Validators.compose([Validators.required])],
      date: [new Date(), Validators.compose([Validators.required])]
    });

    this.actions.push(action);
  }

  deleteAction(index): void {
    this.actions.removeAt(index);
  }

  next(){
    console.log(this.actionPlan.value);
    this.router.navigate(['create','confirm']);
  }
}
