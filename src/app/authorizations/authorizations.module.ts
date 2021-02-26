import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingAuthorizationsComponent } from './pending-authorizations/pending-authorizations.component';
import { RouterModule } from '@angular/router';
import { AuthorizationRoutes } from './authorizations.routing';
import { ApprovedWaiversComponent } from './approved-waivers/approved-waivers.component';


@NgModule({
  declarations: [PendingAuthorizationsComponent, ApprovedWaiversComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthorizationRoutes),
  ]
})
export class AuthorizationsModule { }
