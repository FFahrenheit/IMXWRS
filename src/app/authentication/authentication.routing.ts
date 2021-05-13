import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';

export const AuthenticationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component : LoginComponent,
                data : {
                    title : 'IMXWRS - Login'
                }
            },
            {
                path: 'recover',
                component: RecoverComponent,
                data : {
                    title : 'Recover password'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            }
        ]
    }
];