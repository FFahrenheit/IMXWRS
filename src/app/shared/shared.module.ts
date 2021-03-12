import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute/attribute.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ErrorMessageComponent } from './error-message/error-message.component';



@NgModule({
  declarations: [
    AttributeComponent,
    ConfirmModalComponent,
    ErrorMessageComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AttributeComponent,
    ConfirmModalComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule { }
