import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cell, Form } from 'src/app/models';

@Component({
  selector: 'checkers-cell[cell]',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell!: Cell;
  @Input() isActive = false;
  @Input() isDisabled = false;
  @Input() isTarget = false;
  @Input() form!: Form;

  @Output() action = new EventEmitter();

  constructor() { }

  get isAccent() {
    return (this.cell.x + this.cell.y) % 2 === 0;
  }

  get title() {
    if (this.cell.occupant === undefined)
      return '';

    return `${this.cell.occupant.side} ${this.cell.occupant.isKing ? 'King' : 'Men'}`;
  }
}
