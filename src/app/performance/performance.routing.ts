import { Routes } from "@angular/router";

export const PerformanceRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard'
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            }
        ],
    },
];