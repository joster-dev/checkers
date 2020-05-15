import { Component } from '@angular/core';
import { Form, Game, Cell } from '../models';
import { GameService } from './game.service';
import { Move } from '../models/move.interface';

@Component({
  selector: 'checkers-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  game!: Game;
  form = new Form();
  moves: Move[] = [];
  source?: Cell;
  targets: Cell[] = [];

  constructor(private gameService: GameService) {
    this.newGame();
  }

  // get targetCells(): Cell[] {
  //   return this.moves
  //     .reduce((accumulator, move) => {
  //       if (move.targets.length - 1 < this.sourceCells.length)
  //         return [...accumulator];
  //       return [...accumulator, move.targets[this.sourceCells.length]];
  //     }, []);
  // }

  isDisabled(cell: Cell) {
    if (cell.occupant?.side === this.game.turn)
      return false;

    if (this.source === undefined)
      return this.moves
        .map(move => move.source)
        .includes(cell) === false;

    return this.moves
      .filter(move => move.source === this.source)
      .map(move => move.targets[this.targets.length])
      .includes(cell) === false;
  }

  click(cell: Cell) {
    if (cell.occupant?.side === this.game.turn) {
      this.source = cell === this.source
        ? undefined
        : cell;
      this.targets = [];
      return;
    }

    // todo: this fails in case where 2 different paths have same length
    const moves = this.moves
      .filter(move => move.targets[this.targets.length] === cell);

    if (moves.length === 0)
      throw new Error('invalid move, cell should be disabled');

    if (moves.length === 1 && moves[0].targets.length - 1 === this.targets.length) {
      this.game.play(moves[0]);
      this.moves = this.game.moves();
      delete this.source;
      this.targets = [];
      return;
    }

    this.targets = [cell, ...this.targets];
  }

  newGame() {
    // const board = this.gameService.createBoard(this.form);
    const board = this.gameService.createTestBoard();
    this.game = new Game(board);
    this.moves = this.game.moves();
  }
}
