import { Cell } from './cell';
import { Piece } from './piece';
import { Move } from './move.interface';

export class Game {

  constructor(
    public cells: Cell[],
    public turn: 'a' | 'b' = 'a'
  ) { }

  // get moves(): Move[] {
  //   return this.cells
  //     .filter(cell => cell.occupant !== undefined && cell.occupant.side === this.turn)
  //     .reduce((accumulator, cell) => {

  //     }, []);
  // }

  // targets(cell: Cell): Cell[] {
  //   if (cell.occupant === undefined)
  //     throw new Error('only get targets for sources');
  //   const neighbors = this.cells
  //     .filter(c => (c.x === cell.x + 1 || cell.x === cell.x - 1)
  //       && (c.y === cell.y + 1 || cell.y === cell.y - 1))
  //     .filter(c => c.occupant ===);

  //   const
  // }

  // win(x: number, y: number): boolean {
  //   this.target = this.cells
  // }


}
