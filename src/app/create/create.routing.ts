import { Routes } from '@angular/router';
import { ActionsGuard } from '../guards/create/actions.guard';
import { ConfirmGuard } from '../guards/create/confirm.guard';
import { DetailsGuard } from '../guards/create/details.guard';
import { ActionPlanComponent } from './action-plan/action-plan.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DeviationDetailsComponent } from './deviation-details/deviation-details.component';
import { NewWaiverComponent } from './new-waiver/new-waiver.component';

export const CreateRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'new',
        component: NewWaiverComponent,
      },
      {
        path: 'details',
        component: DeviationDetailsComponent,
        canActivate: [DetailsGuard]
      },
      {
        path: 'actions',
        component: ActionPlanComponent,
        canActivate: [ActionsGuard]
      },
      {
        path: 'confirm',
        component: ConfirmComponent,
        canActivate: [ConfirmGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'new'
      }
    ],
  },
];