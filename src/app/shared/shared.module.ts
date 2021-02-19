import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute/attribute.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AttributeComponent,
    ConfirmModalComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AttributeComponent,
    ConfirmModalComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
