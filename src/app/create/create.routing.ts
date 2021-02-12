import { Routes } from '@angular/router';

import { NewWaiverComponent } from './new-waiver/new-waiver.component';

export const CreateRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'new',
        component: NewWaiverComponent,
      }
    ],
  },
];