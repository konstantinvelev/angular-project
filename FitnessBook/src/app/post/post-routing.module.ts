import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../core/guards/auth.guard';
import { AllComponent } from './all/all.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    {
        path: 'post',
        canActivateChild: [ AuthGuard],
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
                path: 'details/:id',
                component: DetailsComponent,
                data:{
                    isLogged: true,
                    title: 'Details Post Page'
                }
            },
            {
                path: 'edit/:id',
                component: EditComponent,
                data:{
                    isLogged: true,
                    title: 'Edit Post Page'
                }
            },
            {
                path: 'delete/:id',
                component: DeleteComponent,
                data:{
                    isLogged: true,
                    title: 'Delete Post Page'
                }
            },
        ]
    }
]

export const PostRoutingModule = RouterModule.forChild(routes);