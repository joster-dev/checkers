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
        const jumpMoves = this.jumpMoves2({ source: cell, targets: [] });

        const diagonal = this.diagonal(cell);
        const openMoves = diagonal
          .filter(cells => cells.length > 0 && cells[0].occupant === undefined)
          .map(cells => ({ source: cell, targets: [cells[0]] }));

        return accumulator.concat(openMoves, jumpMoves);
      }, [] as Move[]);
  }

  private jumpMoves2(move: Move): Move[] {
    const cellsCopy = JSON.parse(JSON.stringify(this.cells));
    const gameCopy = new Game(cellsCopy, this.turn);
    let source: Cell = move.source;
    for (const target of move.targets) {
      const copySource = gameCopy.cell({ x: source.x, y: source.y });
      const copyCenter = gameCopy.cell({ x: (target.x + source.x) / 2, y: (target.y + source.y) / 2 });
      const copyTarget = gameCopy.cell({ x: target.x, y: target.y })
      copyCenter.occupant = undefined;
      copyTarget.occupant = copySource.occupant;
      copySource.occupant = undefined;
      source = copyTarget;
    }
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
        || (cell.occupant.side === 'a' ? (coordinate.x > 0) : (coordinate.x < 0)))
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

  play(move: Move): boolean {
    let source: Cell = move.source;
    for (const target of move.targets) {
      const copySource = this.cell({ x: source.x, y: source.y });
      const copyCenter = this.cell({ x: (target.x + source.x) / 2, y: (target.y + source.y) / 2 });
      const copyTarget = this.cell({ x: target.x, y: target.y })
      copyCenter.occupant = undefined;
      copyTarget.occupant = copySource.occupant;
      copySource.occupant = undefined;
      source = copyTarget;
    }
    const enemySide = this.turn === 'a' ? 'b' : 'a';
    const enemyPieces = this.cells
      .filter(cell => cell.occupant !== undefined && cell.occupant.side === enemySide);
    if (enemyPieces.length === 0)
      return true;
    if (source.kingHead === enemySide && source.occupant !== undefined)
      source.occupant.isKing = true;
    this.turn = this.turn === 'a' ? 'b' : 'a';
    return false;
  }

}
