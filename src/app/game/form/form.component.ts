import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Form } from 'src/app/models';

@Component({
  selector: 'checkers-form[form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() form!: Form;

  @Output() restart = new EventEmitter();

  constructor() { }
}
