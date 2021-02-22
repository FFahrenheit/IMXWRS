import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute/attribute.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    AttributeComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AttributeComponent,
    ConfirmModalComponent,
  ]
})
export class SharedModule { }
