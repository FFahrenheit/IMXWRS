import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './profile.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileRoutes),
    SharedModule,
  ]
})
export class ProfileModule { }
