import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TasksRoutes } from './tasks.routing';
import { SharedModule } from '../shared/shared.module';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';



@NgModule({
  declarations: [
    TaskDashboardComponent,
    PendingTasksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TasksRoutes),
    SharedModule,
  ]
})
export class TasksModule { }
