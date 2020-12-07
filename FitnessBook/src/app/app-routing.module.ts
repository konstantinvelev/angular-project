import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
  //  canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home page'
        }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'Home page'
        }
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          title: 'Not Found '
        }
      },
    ]

  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
