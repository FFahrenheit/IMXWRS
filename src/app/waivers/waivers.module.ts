  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WaiversRoutes } from './waivers.routing';
import { ViewWaiverComponent } from './view-waiver/view-waiver.component';
import { WaiverComponent } from './waiver/waiver.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizeComponent } from './authorize/authorize.component';
import { MyWaiversComponent } from './my-waivers/my-waivers.component';
import { SignActivityComponent } from './sign-activity/sign-activity.component';
import { LogComponent } from './log/log.component';
import { SortDirective } from '../directives/sort.directive';
import { EditWaiverComponent } from './edit-waiver/edit-waiver.component';

@NgModule({
  declarations: [
    ViewWaiverComponent, 
    WaiverComponent, 
    AuthorizeComponent, 
    MyWaiversComponent, 
    SignActivityComponent, 
    LogComponent,
    SortDirective,
    EditWaiverComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WaiversRoutes),
    SharedModule,
  ],
  exports: [
    WaiverComponent
  ]
})
export class WaiversModule { }