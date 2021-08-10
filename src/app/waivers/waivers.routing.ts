import { Routes } from '@angular/router';
import { ActivityGuard } from '../guards/activity.guard';
import { AuthorizeGuard } from '../guards/authorize.guard';
import { CloseGuard } from '../guards/close.guard';
import { EditGuard } from '../guards/edit.guard';
import { ReopenGuard } from '../guards/reopen.guard';
import { AttachComponent } from './attach/attach.component';
import { AuthorizeComponent } from './authorize/authorize.component';
import { CloseActivityComponent } from './close-activity/close-activity.component';
import { CloseComponent } from './close/close.component';
import { EditWaiverComponent } from './edit-waiver/edit-waiver.component';
import { LogComponent } from './log/log.component';
import { MyWaiversComponent } from './my-waivers/my-waivers.component';
import { RemarkedComponent } from './remarked/remarked.component';
import { ReopenComponent } from './reopen/reopen.component';
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
        path: 'attach/:id',
        component: AttachComponent
      },
      {
        path: 'authorize/:id',
        component: AuthorizeComponent,
        canActivate: [ AuthorizeGuard ]
      },
      {
        path: 'status',
        component: MyWaiversComponent,
      },
      {
        path: 'sign/:id',
        component: SignActivityComponent,
        canActivate: [ ActivityGuard ]
      },
      {
        path: 'mark/:id/:activity',
        component: CloseActivityComponent
      },
      {
        path: 'close/:id',
        component: CloseComponent,
        canActivate: [ CloseGuard ]
      },
      {
        path: 'all',
        component: LogComponent,
      },
      {
        path: 'edit/:id',
        component: EditWaiverComponent,
        canActivate: [ EditGuard ]
      },
      {
        path: 'remarked',
        component: RemarkedComponent,
      },
      {
        path: 'reopen/:id',
        component: ReopenComponent,
        canActivate : [ ReopenGuard ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all'
      }
    ],
  },
];