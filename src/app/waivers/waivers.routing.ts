import { Routes } from '@angular/router';
import { ViewWaiverComponent } from './view-waiver/view-waiver.component';


export const WaiversRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'view/:id',
            component: ViewWaiverComponent,
        },
    ],
  },
];