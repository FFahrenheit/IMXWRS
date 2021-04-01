import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiverDetailsComponent } from './waiver-details/waiver-details.component';
import { RouterModule } from '@angular/router';
import { EditRoutes } from './edit.routing';
import { SharedModule } from '../shared/shared.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WaiverDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EditRoutes),
    SharedModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
  ]
})
export class EditModule { }
