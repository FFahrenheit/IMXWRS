import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './profile.routing';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    ChangePasswordComponent, 
    AddUserComponent, UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileRoutes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
