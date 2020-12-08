import { RouterModule, Routes } from "@angular/router";
import { AllComponent } from './all/all.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    {
        path: 'post',
        //canActivateChild: [ AuthGuard],
        children:[
            {
                path: 'create',
                component: CreateComponent,
                data:{
                    isLogged: true,
                    title: 'Create Post Page'
                }
            },
            {
                path: 'all',
                component: AllComponent,
                data:{
                    isLogged: true,
                    title: 'All Posts Page'
                }
            },
            {
                path: 'details',
                component: DetailsComponent,
                data:{
                    isLogged: true,
                    title: 'Details Page'
                }
            },
        ]
    }
]

export const PostRoutingModule = RouterModule.forChild(routes);