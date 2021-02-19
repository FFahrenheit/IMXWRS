import { Routes } from '@angular/router';
import { Error404Component } from './errors/error404/error404.component';
import { AuthGuard } from './guards/auth.guard';

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
            }
        ]
    },
    {
        path: '',
        component: BlankComponent,
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
        path: '**',
        component: Error404Component,
    }
];