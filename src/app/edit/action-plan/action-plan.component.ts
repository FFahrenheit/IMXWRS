import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionUser } from 'src/app/interfaces/action-user.interface';
import { EditService } from 'src/app/services/edit.service';
import { UsersService } from 'src/app/services/users.service';
import { ResponsableInputComponent } from 'src/app/shared/responsable-input/responsable-input.component';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.scss']
})
export class ActionPlanComponent implements OnInit {

  public actionPlan : FormGroup = Object.create(null);
  public today = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  public users : ActionUser[];
  public model : any;
  private number : string;
  @ViewChildren('responsable') responsables: QueryList<ResponsableInputComponent>;

  constructor(private fb : FormBuilder,
              private router : Router,
              private editService : EditService,
              private datePipe : DatePipe,
              private userService : UsersService) { 
  }

  ngOnInit(): void {
    this.number = this.editService.getWaiver()['number'];

    this.actionPlan = this.fb.group({
      actions: this.fb.array([])
    });

    if(this.editService.wr.actions == null || this.editService.wr?.actions.length == 0){
      this.addAction();
    }else{
      let srv = this.editService.wr;
      let actions = [...(srv.actions),...(srv.newActions|| []),...(srv.modifiedActions || [])];
      console.log(actions);
      actions.forEach(a=>{
        const action = this.fb.group({
          responsable: [ a.name || '', Validators.compose([Validators.required])],
          action: [ a.description || '', Validators.compose([Validators.required])],
          date: [this.datePipe.transform(a.date,'yyyy-MM-dd') ||'', Validators.compose([Validators.required])],
          username: [a.responsable|| '', Validators.compose([Validators.required])],
          id: [a.id]
        });
    
        this.actions.push(action);
      });
    }

    this.userService.getUsers()
        .subscribe((resp:any)=>{
          console.log(resp);

          if(resp.status){
            this.users = resp.users;
            console.log(this.users);
          }
        },(error)=>{
          console.log('Error');
          console.log(error);
        });
  }

  ngOnDestroy(){
    this.editService.changeActions(this.getActions());
    console.log(this.editService.wr);
    this.router.navigate(['edit',this.number,'confirm']);
  }

  get actions(): FormArray {
    return this.actionPlan.get('actions') as FormArray;
  }

  addAction(){
    const action = this.fb.group({
      responsable: [ '', Validators.compose([Validators.required])],
      action: [ '', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      username: '',
      id : 0
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
      console.log(this.getActions());
      console.log("Invalid");
      this.actionPlan.markAllAsTouched();
      this.responsables.forEach(c=>{
        c.markAsTouched();
      });
    }
  }

  getActions(){
    let actions = [];
    this.actions.value.forEach(a=>{
      const action = {
        action : a['action'],
        date : a['date'],
        responsable : a['responsable'], 
        username : a['username'],
        id : a['id']
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

  setValues(data){
    if(data.username != null){
      let act = this.actions.at(data.index) as FormGroup;
      act.controls['responsable'].setValue(data.name);
      act.controls['username'].setValue(data.username);
    }
  }

  getUserIfAny(index : number){
    let user = this.actions.at(index).value;
    if(user['responsable'] != null && user['responsable'] != ''){
      return {
        username: user['username'],
        responsable: user['responsable']
      };
    }
    return null;
  }

}
