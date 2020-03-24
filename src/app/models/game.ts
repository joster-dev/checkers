import { Cell } from './cell';
import { Piece } from './piece';
import { Move } from './move.interface';

export class Game {

  constructor(
    public cells: Cell[],
    public turn: 'a' | 'b' = 'a'
  ) { }

  get moves(): Move[] {
    return this.cells
      .filter(cell => cell.occupant !== undefined && cell.occupant.side === this.turn)
      .reduce((accumulator, cell) => {
        const adjacentCells = this.adjacent(cell)
          .filter(c => cell.occupant?.isKing === true
            || (cell.occupant?.side === 'a'
              ? cell.x < c.x
              : cell.x > c.x));

        const openMoves: Move[] = adjacentCells
          .filter(c => c.occupant === undefined)
          .map(c => ({ source: cell, targets: [c] }));

        // const jumpMoves: Move[] = adjacentCells

        return accumulator.concat(openMoves);
      }, [] as Move[]);
  }

  // targets(cell: Cell): Cell[] {
  //   if (cell.occupant === undefined)
  //     throw new Error('only get targets for sources');


  //   const
  // }

  // win(x: number, y: number): boolean {
  //   this.target = this.cells
  // }

  private adjacent(cell: Cell): Cell[] {
    return this.cells
      .filter(c => (c.x === cell.x + 1 && c.y === cell.y + 1)
        || (c.x === cell.x + 1 && c.y === cell.y - 1)
        || (c.x === cell.x - 1 && c.y === cell.y + 1)
        || (c.x === cell.x - 1 && c.y === cell.y - 1));
  }

  play(move: Move) {

  }

}
