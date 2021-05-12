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
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SortDirective } from '../directives/sort.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReopenModalComponent } from './reopen-modal/reopen-modal.component';
import { WaiverActionsComponent } from './waiver-actions/waiver-actions.component';
import { ChartComponent } from './chart/chart.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

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
    FileUploadComponent,
    ReopenModalComponent,
    WaiverActionsComponent,
    ChartComponent,
    ProfileViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    PipesModule.forRoot(),
    NgbModule,
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
    FileUploadComponent,
    ReopenModalComponent,
    WaiverActionsComponent,
    ChartComponent,
    ProfileViewComponent
  ]
})
export class SharedModule { }
