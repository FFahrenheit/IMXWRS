import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingAuthorizationsComponent } from './pending-authorizations/pending-authorizations.component';
import { RouterModule } from '@angular/router';
import { AuthorizationRoutes } from './authorizations.routing';


@NgModule({
  declarations: [PendingAuthorizationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthorizationRoutes),
  ]
})
export class AuthorizationsModule { }
