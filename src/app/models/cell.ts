import { Piece } from './piece';

export class Cell {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly kingHead?: 'a' | 'b',
    public occupant?: Piece
  ) { }
}
