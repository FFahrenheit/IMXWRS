import { Routes } from "@angular/router";
import { ManagerAuthorizationGuard } from "../guards/manager-authorization.guard";
import { PendingAuthorizationsComponent } from "./pending-authorizations/pending-authorizations.component";

export const AuthorizationRoutes: Routes = [
    {
        path: '',
        canActivate: [ ManagerAuthorizationGuard ],
        children: [
            {
                path: 'pending',
                component: PendingAuthorizationsComponent
            }, 
        ]
    }
]