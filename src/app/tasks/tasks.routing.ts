import { Routes } from "@angular/router";
import { TaskDashboardComponent } from "./task-dashboard/task-dashboard.component";

export const TasksRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'dashboard',
            component: TaskDashboardComponent,
        },
    ],
  },
];