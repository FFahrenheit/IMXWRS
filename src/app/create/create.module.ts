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
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NewWaiverComponent,
    DeviationDetailsComponent,
    ActionPlanComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(CreateRoutes),
    SharedModule,
  ]
})
export class CreateModule { }
