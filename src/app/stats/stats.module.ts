import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatsRoutes } from './stats.routing';
import { SharedModule } from '../shared/shared.module';
import { OverallComponent } from './overall/overall.component';
import { IndividualComponent } from './individual/individual.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OverallComponent, IndividualComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(StatsRoutes),
    SharedModule,
    FormsModule
  ]
})
export class StatsModule { }
