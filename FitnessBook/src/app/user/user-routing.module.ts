import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../core/guards/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'user',
        canActivateChild: [ AuthGuard],
        children:[
            {
                path: 'register',
                component: RegisterComponent,
                data:{
                    isLogged: false,
                    title: 'Register Page'
                }
            },
            {
                path: 'login',
                component: LoginComponent,
                data:{
                    isLogged: false,
                    title: 'Login Page'
                }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data:{
                    isLogged: true,
                    title: 'Profile Page'
                }
            },
            {
                path: 'edit',
                component: EditProfileComponent,
                data:{
                    isLogged: true,
                    title: 'Edit Profile Page'
                }
            },
        ]
    }
]

export const UserRoutingModule = RouterModule.forChild(routes);