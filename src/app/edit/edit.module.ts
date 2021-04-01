import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiverDetailsComponent } from './waiver-details/waiver-details.component';
import { RouterModule } from '@angular/router';
import { EditRoutes } from './edit.routing';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WaiverDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EditRoutes),
    SharedModule,
  ]
})
export class EditModule { }
