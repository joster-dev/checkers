import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FormComponent } from './form.component';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    FormsModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
