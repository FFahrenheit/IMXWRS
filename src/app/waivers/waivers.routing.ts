import { Routes } from '@angular/router';
import { AuthorizeComponent } from './authorize/authorize.component';
import { ViewWaiverComponent } from './view-waiver/view-waiver.component';


export const WaiversRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view/:id',
        component: ViewWaiverComponent,
      },
      {
        path: 'authorize/:id',
        component: AuthorizeComponent,
      }
    ],
  },
];