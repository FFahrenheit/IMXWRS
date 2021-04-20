import { Routes } from "@angular/router";
import { LogComponent } from "../waivers/log/log.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

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
          component: ChangePasswordComponent
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'dashboard'
        }
    ],
  },
];