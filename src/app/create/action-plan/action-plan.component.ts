import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action } from 'src/app/interfaces/create-wr';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.scss']
})
export class ActionPlanComponent implements OnInit, OnDestroy {

  public actionPlan : FormGroup = Object.create(null);
  public today = this.datePipe.transform(new Date(),"yyyy-MM-dd");

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

    if(this.waiverService.wr.actions == null || this.waiverService.wr?.actions.length == 0){
      this.addAction();
    }else{
      this.waiverService.wr.actions.forEach(a=>{
        const action = this.fb.group({
          responsable: [ a.responsable || '', Validators.compose([Validators.required])],
          action: [ a.action || '', Validators.compose([Validators.required])],
          date: [a.date ||'', Validators.compose([Validators.required])]
        });
    
        this.actions.push(action);
      });
    }
  }

  ngOnDestroy(){
      this.waiverService.setActions(this.getActions());
      this.router.navigate(['create','confirm']);
  }

  get actions(): FormArray {
    return this.actionPlan.get('actions') as FormArray;
  }

  addAction(){
    const action = this.fb.group({
      responsable: [ '', Validators.compose([Validators.required])],
      action: [ '', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])]
    });

    this.actions.push(action);
  }

  deleteAction(index): void {
    this.actions.removeAt(index);
  }

  next(){
    if(this.actionPlan.valid){
      this.ngOnDestroy();
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
