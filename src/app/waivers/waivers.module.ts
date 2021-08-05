  
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
import { EditWaiverComponent } from './edit-waiver/edit-waiver.component';
import { RemarkedComponent } from './remarked/remarked.component';
import { RepeatedWaiversComponent } from './repeated-waivers/repeated-waivers.component';
import { CloseComponent } from './close/close.component';
import { ReopenComponent } from './reopen/reopen.component';
import { CloseActivityComponent } from './close-activity/close-activity.component';

@NgModule({
  declarations: [
    ViewWaiverComponent, 
    WaiverComponent, 
    AuthorizeComponent, 
    MyWaiversComponent, 
    SignActivityComponent, 
    LogComponent,
    EditWaiverComponent,
    RemarkedComponent,
    RepeatedWaiversComponent,
    CloseComponent,
    ReopenComponent,
    CloseActivityComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WaiversRoutes),
    SharedModule,
  ],
  exports: [
    WaiverComponent,
    RepeatedWaiversComponent,
  ]
})
export class WaiversModule { }