import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Form } from 'src/app/models';

@Component({
  selector: 'checkers-form[model]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() model!: Form;

  @Output() restart = new EventEmitter();

  constructor() { }
}
