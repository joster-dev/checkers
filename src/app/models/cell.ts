import { Piece } from './piece';

export class Cell {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly isStartCell?: 'a' | 'b',
    public occupant?: Piece
  ) { }
}
