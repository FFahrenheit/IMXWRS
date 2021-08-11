import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatsRoutes } from './stats.routing';
import { SharedModule } from '../shared/shared.module';
import { OverallComponent } from './overall/overall.component';


@NgModule({
  declarations: [OverallComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(StatsRoutes),
    SharedModule
  ]
})
export class StatsModule { }
