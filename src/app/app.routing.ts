import { Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';

import { BlankComponent } from './layouts/blank/blank.component';



export const AppRoutes: Routes = [
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