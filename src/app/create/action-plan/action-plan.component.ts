import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action } from 'src/app/interfaces/create-wr';
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
              private waiverService : CreateWrService,
              private datePipe : DatePipe) { 
  }

  ngOnInit(): void {
    console.log(this.waiverService.wr);

    this.actionPlan = this.fb.group({
      actions: this.fb.array([])
    });
    this.addAction();
  }

  
  get actions(): FormArray {
    return this.actionPlan.get('actions') as FormArray;
  }

  addAction(){
    const action = this.fb.group({
      responsable: [ '', Validators.compose([Validators.required])],
      action: [ '', Validators.compose([Validators.required])],
      date: [this.datePipe.transform(new Date(),"yyyy-MM-dd"), Validators.compose([Validators.required])]
    });

    this.actions.push(action);
  }

  deleteAction(index): void {
    this.actions.removeAt(index);
  }

  next(){
    if(this.actionPlan.valid){
      console.log("Valid");
      this.waiverService.setActions(this.getActions());
      this.router.navigate(['create','confirm']);
    }else{
      console.log("Invalid");
      this.actionPlan.markAllAsTouched();
    }
  }

  getActions(){
    let actions = [];
    this.actions.value.forEach(a=>{
      const action : Action = {
        action : a['action'],
        date : a['date'],
        responsable : a['responsable'] 
      }
      actions.push(action);
    });

    return actions;
  }

  getStyle(action : FormGroup, field : string) : string{
    if(!action.controls[field].touched){
      return '';
    }
    return (action.controls[field].valid) ? 'is-valid' : 'is-invalid';
  }

}
