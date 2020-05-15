import { Piece } from './piece';

export class Cell {
  hidden = false;
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly kingHead?: 'a' | 'b',
    public occupant?: Piece
  ) { }

  isSame(cell: Cell) {
    return this.x === cell.x && this.y === cell.y;
  }
}
