import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute/attribute.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { AlertComponent } from './alert/alert.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemarkModalComponent } from './remark-modal/remark-modal.component';
import { ResponsableInputComponent } from './responsable-input/responsable-input.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SortDirective } from '../directives/sort.directive';

@NgModule({
  declarations: [
    AttributeComponent,
    ConfirmModalComponent,
    ErrorMessageComponent,
    AlertComponent,
    FilterModalComponent,
    RemarkModalComponent,
    ResponsableInputComponent,
    SortDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
  ],
  exports: [
    AttributeComponent,
    ConfirmModalComponent,
    ErrorMessageComponent,
    AlertComponent,
    FilterModalComponent,
    RemarkModalComponent,
    ResponsableInputComponent,
    SortDirective,
  ]
})
export class SharedModule { }
