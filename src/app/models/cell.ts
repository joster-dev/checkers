import { Piece } from './piece';

export class Cell {
  occupant?: Piece;
  readonly startCell?: 'a' | 'b';

  constructor(public readonly x: number, public readonly y: number) {
    if (x === 0 && y % 2 === 0) {
      this.startCell = 'a';
      this.occupant = new Piece('a');
    }
    if (x === 1 && y % 2 === 1) {
      this.occupant = new Piece('a');
    }
    if (x === 2 && y % 2 === 0) {
      this.occupant = new Piece('a');
    }

    if (x === 4 && y % 2 === 1) {
      this.occupant = new Piece('b');
    }
    if (x === 5 && y % 2 === 0) {
      this.occupant = new Piece('b');
    }
    if (x === 6 && y % 2 === 1) {
      this.startCell = 'b';
      this.occupant = new Piece('b');
    }
  }
}
