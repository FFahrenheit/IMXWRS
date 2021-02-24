import { Routes } from "@angular/router";
import { PendingTasksComponent } from "./pending-tasks/pending-tasks.component";
import { TaskDashboardComponent } from "./task-dashboard/task-dashboard.component";

export const TasksRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'assigned',
            component: TaskDashboardComponent,
        },
        {
          path: 'pending',
          component: PendingTasksComponent,
        }
    ],
  },
];