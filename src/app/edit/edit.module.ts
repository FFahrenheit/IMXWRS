import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiverDetailsComponent } from './waiver-details/waiver-details.component';
import { RouterModule } from '@angular/router';
import { EditRoutes } from './edit.routing';


@NgModule({
  declarations: [
    WaiverDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EditRoutes),
  ]
})
export class EditModule { }
