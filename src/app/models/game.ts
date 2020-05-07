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
        const diagonal = this.diagonal(cell, 2);

        const openMoves = diagonal
          .filter(cells => cells.length > 0 && cells[0].occupant === undefined)
          .map(cells => ({ source: cell, targets: [cells[0]] }));

        const jumpMoves = diagonal
          .filter(cells => cells.length > 1
            && cells[0].occupant !== undefined
            && cells[0].occupant.side !== this.turn
            && cells[1].occupant === undefined)
          .reduce((acc, cells) => {
            const heh = this.jumpMoves({ source: cell, targets: [cells[1]] });
            debugger;
            return acc;
          }, [] as Move[]);



        return accumulator.concat(openMoves);
      }, [] as Move[]);
  }

  jumpMoves(move: Move): Move[] {
    const moveSource = move.targets.length <= 1 ? move.source : move.targets[move.targets.length - 2];
    const moveTarget = move.targets[move.targets.length - 1];
    const cellsCopy = JSON.parse(JSON.stringify(this.cells));
    const gameCopy = new Game(cellsCopy, this.turn);
    debugger;
    const diagonal = gameCopy.diagonal(moveTarget, 2);
    const jumps = diagonal
      .filter(cells => cells.length > 1
        && cells[0].occupant !== undefined
        && cells[0].occupant.side !== this.turn
        && cells[1].occupant === undefined);

    if (jumps.length === 0)
      return [move];

    debugger;

    // play the move
    // return recursive

    return []


    // return [...gameCopy.jumpMoves({})]

    // create a new copy of game
    // preform the jump to remove piece from board


  }

  // targets(cell: Cell): Cell[] {
  //   if (cell.occupant === undefined)
  //     throw new Error('only get targets for sources');


  //   const
  // }

  // win(x: number, y: number): boolean {
  //   this.target = this.cells
  // }


  // @returns - each Cell[] max length equal to @depth
  private diagonal(cell: Cell, depth = 1): Cell[][] {
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
