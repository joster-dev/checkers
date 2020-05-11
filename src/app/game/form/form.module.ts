import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControlModule } from '@joster/form-control';

import { FormComponent } from './form.component';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    FormsModule,
    FormControlModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
