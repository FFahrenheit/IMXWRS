import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateRoutes } from './create.routing';
import { NewWaiverComponent } from './new-waiver/new-waiver.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviationDetailsComponent } from './deviation-details/deviation-details.component';
import { ActionPlanComponent } from './action-plan/action-plan.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { AttributeComponent } from '../shared/attribute/attribute.component';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    NewWaiverComponent,
    DeviationDetailsComponent,
    ActionPlanComponent,
    ConfirmComponent,
    AttributeComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(CreateRoutes)
  ]
})
export class CreateModule { }
