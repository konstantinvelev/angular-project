import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailValidatorDirective } from './email-validator.directive';
import { SubmitOnValidDirective } from './dir.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    EmailValidatorDirective,
    SubmitOnValidDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoaderComponent,
    EmailValidatorDirective,
    SubmitOnValidDirective
  ]
})
export class SharedModule { }
