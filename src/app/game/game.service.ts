import { Injectable } from '@angular/core';
import { Cell, Form, Piece } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  createBoard(form: Form): Cell[] {
    const temp: Cell[] = [];

    for (let x = 0; x < form.width; x++)
      for (let y = 0; y < form.height; y++) {
        let cell = new Cell(x, y);

        if ((x + y) % 2 === 0) {
          if (x === 0)
            cell = new Cell(x, y, 'a');

          if (x === form.width - 1)
            cell = new Cell(x, y, 'b');

          if (x >= 0 && x < form.rank)
            cell.occupant = new Piece('a');

          if (x > form.width - 1 - form.rank && x <= form.width - 1)
            cell.occupant = new Piece('b');
        }

        temp.push(cell);
      }

    return temp;
  }

  createTestBoard(): Cell[] {
    const temp: Cell[] = [];

    for (let x = 0; x < 8; x++)
      for (let y = 0; y < 8; y++) {
        let cell = new Cell(x, y);

        if ((x + y) % 2 === 0) {
          if (x === 0)
            cell = new Cell(x, y, 'a');

          if (x === 8 - 1)
            cell = new Cell(x, y, 'b');
        }

        if (x === 3 && y === 5) {
          cell.occupant = new Piece('a');
          cell.occupant.isKing = true;
        }

        if ((x === 4 && y === 4)
          || (x === 7 && y === 1)
          || (x === 4 && y === 6)
          || (x === 6 && y === 6)
          || (x === 6 && y === 4)
          || (x === 6 && y === 2)) {
          cell.occupant = new Piece('b');
        }

        temp.push(cell);
      }

    return temp;
  }
}
