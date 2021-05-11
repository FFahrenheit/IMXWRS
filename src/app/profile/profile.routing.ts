import { Routes } from "@angular/router";
import { RecoverPasswordGuard } from "../guards/recover-password.guard";
import { LogComponent } from "../waivers/log/log.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

export const ProfileRoutes : Routes = [
  {
    path: '',
    children: [
        {
            path: 'dashboard',
            component: LogComponent
        },
        {
          path: 'password/change',
          component: ChangePasswordComponent,
          canDeactivate: [ RecoverPasswordGuard ]
        },
        {
          path: 'users/add',
          component: AddUserComponent
        },
        {
          path: 'profile/:user',
          component: UserProfileComponent
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'dashboard'
        }
    ],
  },
];