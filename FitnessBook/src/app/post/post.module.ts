import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { AllComponent } from './all/all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PostRoutingModule } from './post-routing.module';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    CreateComponent,
    AllComponent,
    DetailsComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PostRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    PostModule,
  ],
  exports: [
    CreateComponent,
    AllComponent,
    DetailsComponent,
    EditComponent,
    DeleteComponent
  ]
})
export class PostModule { }
