  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WaiversRoutes } from './waivers.routing';
import { ViewWaiverComponent } from './view-waiver/view-waiver.component';
import { WaiverComponent } from './waiver/waiver.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizeComponent } from './authorize/authorize.component';

@NgModule({
  declarations: [
    ViewWaiverComponent, 
    WaiverComponent, AuthorizeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WaiversRoutes),
    SharedModule,
  ]
})
export class WaiversModule { }