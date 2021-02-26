import { Routes } from "@angular/router";
import { ManagerAuthorizationGuard } from "../guards/manager-authorization.guard";
import { ApprovedWaiversComponent } from "./approved-waivers/approved-waivers.component";
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
            {
                path: 'approved',
                component: ApprovedWaiversComponent
            }
        ]
    }
]