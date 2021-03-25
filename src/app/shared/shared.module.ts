import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute/attribute.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { AlertComponent } from './alert/alert.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AttributeComponent,
    ConfirmModalComponent,
    ErrorMessageComponent,
    AlertComponent,
    FilterModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AttributeComponent,
    ConfirmModalComponent,
    ErrorMessageComponent,
    AlertComponent,
    FilterModalComponent,
  ]
})
export class SharedModule { }
