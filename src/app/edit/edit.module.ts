import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiverDetailsComponent } from './waiver-details/waiver-details.component';
import { RouterModule } from '@angular/router';
import { EditRoutes } from './edit.routing';
import { SharedModule } from '../shared/shared.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviationDetailsComponent } from './deviation-details/deviation-details.component';
import { ActionPlanComponent } from './action-plan/action-plan.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { WaiversModule } from '../waivers/waivers.module';


@NgModule({
  declarations: [
    WaiverDetailsComponent,
    DeviationDetailsComponent,
    ActionPlanComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EditRoutes),
    SharedModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    WaiversModule,
  ]
})
export class EditModule { }
