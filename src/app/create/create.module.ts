import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateRoutes } from './create.routing';
import { NewWaiverComponent } from './new-waiver/new-waiver.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviationDetailsComponent } from './deviation-details/deviation-details.component';
import { ActionPlanComponent } from './action-plan/action-plan.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { SharedModule } from '../shared/shared.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ResponsableInputComponent } from './responsable-input/responsable-input.component';

@NgModule({
  declarations: [
    NewWaiverComponent,
    DeviationDetailsComponent,
    ActionPlanComponent,
    ConfirmComponent,
    ResponsableInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(CreateRoutes),
    SharedModule,
    NgbTypeaheadModule,
  ]
})
export class CreateModule { }
