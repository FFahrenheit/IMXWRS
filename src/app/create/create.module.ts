import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateRoutes } from './create.routing';
import { NewWaiverComponent } from './new-waiver/new-waiver.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviationDetailsComponent } from './deviation-details/deviation-details.component';

@NgModule({
  declarations: [
    NewWaiverComponent,
    DeviationDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(CreateRoutes)
  ]
})
export class CreateModule { }
