import { Routes } from '@angular/router';
import { AuthorizeComponent } from './authorize/authorize.component';
import { EditWaiverComponent } from './edit-waiver/edit-waiver.component';
import { LogComponent } from './log/log.component';
import { MyWaiversComponent } from './my-waivers/my-waivers.component';
import { RemarkedComponent } from './remarked/remarked.component';
import { SignActivityComponent } from './sign-activity/sign-activity.component';
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
      },
      {
        path: 'status',
        component: MyWaiversComponent,
      },
      {
        path: 'sign/:id',
        component: SignActivityComponent,
      },
      {
        path: 'all',
        component: LogComponent,
      },
      {
        path: 'edit/:id',
        component: EditWaiverComponent,
      },
      {
        path: 'remarked',
        component: RemarkedComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all'
      }
    ],
  },
];