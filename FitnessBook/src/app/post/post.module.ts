import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { AllComponent } from './all/all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PostRoutingModule } from './post-routing.module';



@NgModule({
  declarations: [
    CreateComponent, 
    AllComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    CreateComponent, 
    AllComponent
  ],
  providers:[
    PostModule
  ]
})
export class PostModule { }
