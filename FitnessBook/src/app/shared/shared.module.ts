import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { SubmitOnValidDirective } from './dir.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    SubmitOnValidDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoaderComponent,
    SubmitOnValidDirective
  ]
})
export class SharedModule { }
