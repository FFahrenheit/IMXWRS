import { Routes } from "@angular/router";
import { EditGuard } from "../guards/edit.guard";
import { ActionPlanComponent } from "./action-plan/action-plan.component";
import { DeviationDetailsComponent } from "./deviation-details/deviation-details.component";
import { WaiverDetailsComponent } from "./waiver-details/waiver-details.component";

export const EditRoutes: Routes = [
    {
      path: '',
      canActivate: [ EditGuard ],
      children: [
        {
          path: 'info',
          component: WaiverDetailsComponent,
        },
        {
          path: 'details',
          component: DeviationDetailsComponent
        },
        {
          path: 'actions',
          component: ActionPlanComponent
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'info'
        }
      ],
    },
  ];