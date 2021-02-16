import { Routes } from '@angular/router';
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
      },
      {
        path: 'actions',
        component: ActionPlanComponent,
      },
      {
        path: 'confirm',
        component: ConfirmComponent,
      }
    ],
  },
];