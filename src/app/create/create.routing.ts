import { Routes } from '@angular/router';
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
      }
    ],
  },
];