import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { AllComponent } from './all/all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PostRoutingModule } from './post-routing.module';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    CreateComponent,
    AllComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PostRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    PostModule
  ],
  exports: [
    CreateComponent,
    AllComponent,
    DetailsComponent
  ]
})
export class PostModule { }
