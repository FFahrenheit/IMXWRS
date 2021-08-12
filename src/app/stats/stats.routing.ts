import { Routes } from "@angular/router";
import { IndividualComponent } from "./individual/individual.component";
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
                path: 'individual',
                component: IndividualComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'overall'
            }
        ],
    },
];