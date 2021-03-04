import { Routes } from '@angular/router';
import { Error403Component } from './errors/error403/error403.component';
import { Error404Component } from './errors/error404/error404.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

import { BlankComponent } from './layouts/blank/blank.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';



export const AppRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'create',
                loadChildren: () => 
                    import('./create/create.module').then(
                        (m) => m.CreateModule
                    )
            },
            {
                path: 'waivers',
                loadChildren: () => 
                    import('./waivers/waivers.module').then(
                        (m) => m.WaiversModule
                    )
            },
            {
                path: 'tasks',
                loadChildren: () => 
                import('./tasks/tasks.module').then(
                    (m) => m.TasksModule
                )
            },
            {
                path: 'authorizations',
                loadChildren: () =>
                import('./authorizations/authorizations.module').then(
                    (m) => m.AuthorizationsModule
                )
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'waivers'
            },
        ]
    },
    {
        path: '',
        component: BlankComponent,
        canActivate: [ LoginGuard ],
        children: [
            {
                path: 'authentication',
                loadChildren: () =>
                import('./authentication/authentication.module').then(
                    (m) => m.AuthenticationModule
                ),
            }
        ]
    },
    {
        path: '403',
        component: Error403Component
    },
    {
        path: '**',
        component: Error404Component,
    }
];