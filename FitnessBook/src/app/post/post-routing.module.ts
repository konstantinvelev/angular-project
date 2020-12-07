import { RouterModule, Routes } from "@angular/router";
import { AllComponent } from './all/all.component';
import { CreateComponent } from './create/create.component';

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
        ]
    }
]

export const PostRoutingModule = RouterModule.forChild(routes);