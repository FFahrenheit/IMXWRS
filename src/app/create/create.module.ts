import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateRoutes } from './create.routing';
import { NewWaiverComponent } from './new-waiver/new-waiver.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewWaiverComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(CreateRoutes)
  ]
})
export class CreateModule { }
