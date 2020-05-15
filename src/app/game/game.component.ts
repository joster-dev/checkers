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
  moves: Move[] = [];
  form = new Form();

  sourceCell?: Cell;
  // todo: implement reverse actions for player
  moveBuilderIndex = 0;

  constructor(private gameService: GameService) {
    this.newGame();
  }

  get targetCells(): Cell[] {
    return this.moves
      .filter(move => this.sourceCell === undefined || move.source === this.sourceCell)
      .reduce((accumulator, move) => {
        if (move.targets.length - 1 < this.moveBuilderIndex) {
          return [...accumulator];
        }
        return [...accumulator, move.targets[this.moveBuilderIndex]];
      }, []);
  }

  isDisabled(cell: Cell) {
    if (this.sourceCell === undefined)
      return this.moves
        .map(move => move.source)
        .includes(cell) === false;

    if (this.sourceCell === cell)
      return false;

    return this.targetCells.find(item => cell.x === item.x && cell.y === item.y) === undefined;
  }

  click(cell: Cell) {
    if (cell.occupant !== undefined && cell.occupant.side === this.game.turn) {
      this.sourceCell = cell === this.sourceCell ? undefined : cell;
      return;
    }

    if (cell === this.sourceCell) {
      this.sourceCell = undefined;
      return;
    }

    const move = this.moves.find(m => m.targets[this.moveBuilderIndex] === cell);
    if (move === undefined) {
      throw new Error('invalid move, cell should be disabled');
    }
    if (move.targets.length - 1 === this.moveBuilderIndex) {
      this.game.play(move);
      return;
    }
    this.moveBuilderIndex = this.moveBuilderIndex + 1;
    debugger
  }

  newGame() {
    // const board = this.gameService.createBoard(this.form);
    const board = this.gameService.createTestBoard();
    this.game = new Game(board);
    this.moves = this.game.moves();
  }
}
