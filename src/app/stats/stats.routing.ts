import { Routes } from "@angular/router";
import { OverallComponent } from "./overall/overall.component";

export const StatsRoutes : Routes = [
    {
        path: '',
        children: [
            {
                path: 'overall',
                component: OverallComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'overall'
            }
        ],
    },
];