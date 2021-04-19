import { Routes } from "@angular/router";
import { LogComponent } from "../waivers/log/log.component";

export const TasksRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'dashboard',
            component: LogComponent
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'dashboard'
        }
    ],
  },
];