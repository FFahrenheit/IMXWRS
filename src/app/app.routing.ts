import { Routes } from '@angular/router';
import { Error403Component } from './errors/error403/error403.component';
import { Error404Component } from './errors/error404/error404.component';
import { Error500Component } from './errors/error500/error500.component';
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
                path: 'edit/:id',
                loadChildren: ()=>
                import('./edit/edit.module').then(
                    (m) => m.EditModule
                )
            },
            {
                path: 'profile',
                loadChildren: ()=>
                import('./profile/profile.module').then(
                    (m) => m.ProfileModule
                )
            },
            {
                path: 'performance',
                loadChildren: () =>
                import('./performance/performance.module').then(
                    (m) => m.PerformanceModule
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
        path: '404',
        component: Error404Component
    },
    {
        path: '500',
        component: Error500Component
    },
    {
        path: '**',
        component: Error404Component,
    }
];