import { Cell } from './cell';
import { Piece } from './piece';
import { Move } from './move.interface';

export class Game {

  constructor(
    public cells: Cell[],
    public turn: 'a' | 'b' = 'a'
  ) { }

  get army(): Cell[] {
    return this.cells
      .filter(cell => cell.occupant !== undefined && cell.occupant.side === this.turn);
  }

  get moves(): Move[] {
    return this.army
      .reduce((accumulator, cell) => {
        const diagonal = this.diagonal(cell, 2);

        const openMoves = diagonal
          .filter(cells => cells.length > 0 && cells[0].occupant === undefined)
          .map(cells => ({ source: cell, targets: [cells[0]] }));

        const jumpMoves = this.jumpMoves2({ source: cell, targets: [] });

        return accumulator.concat(openMoves, jumpMoves);
      }, [] as Move[]);
  }

  private jumpMoves2(move: Move): Move[] {
    const cellsCopy = JSON.parse(JSON.stringify(this.cells));
    const gameCopy = new Game(cellsCopy, this.turn);
    const source = move.targets.length === 0
      ? move.source
      : move.targets[move.targets.length - 1];
    const diagonal = gameCopy.diagonal(source, 2);
    const jumpMoves = diagonal
      .filter(cells => cells.length > 1
        && cells[0].occupant !== undefined
        && cells[0].occupant.side !== this.turn
        && cells[1].occupant === undefined);

    if (jumpMoves.length === 0) {
      if (move.targets.length === 0)
        return [];
      return [move];
    }

    return jumpMoves
      .map(jump => this.jumpMoves2({ source: move.source, targets: move.targets.concat(this.cell(jump[1])) }))
      .reduce((acc, cells) => acc.concat(cells), []);
  }

  cell(cell: { x: number; y: number }): Cell {
    const temp = this.cells.find(item => item.x === cell.x && item.y === cell.y);
    if (temp === undefined)
      throw new Error('invalid cell');
    return temp;
  }

  // @returns - each Cell[] max length equal to @depth
  diagonal(cell: Cell, depth = 1): Cell[][] {
    return [
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: -1 }
    ]
      .filter(coordinate => cell.occupant === undefined
        || cell.occupant.isKing === true
        || cell.occupant.side === 'a' ? coordinate.x > 0 : coordinate.x < 0)
      .map(coordinate => {
        let temp: Cell[] = [];
        for (let i = 0; i < depth; i++)
          temp = temp.concat(this.cells
            .filter(c => c.x === cell.x + ((i + 1) * coordinate.x)
              && c.y === cell.y + ((i + 1) * coordinate.y)));
        return temp;
      })
      .filter(cells => cells.length > 0);

  }

  play(move: Move) {

  }

}
