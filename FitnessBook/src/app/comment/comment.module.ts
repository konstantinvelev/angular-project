import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from './comment.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CommentService
  ],
  exports:[
  ]
})
export class CommentModule { }
