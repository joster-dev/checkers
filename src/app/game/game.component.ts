import { Component } from '@angular/core';
import { Form, Game, Cell } from '../models';
import { GameService } from './game.service';

@Component({
  selector: 'checkers-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  game!: Game;
  form = new Form();

  sourceCell?: Cell;
  // todo: implement reverse actions for player
  // sourceMovedIndex = 0;

  constructor(private gameService: GameService) {
    this.newGame();
  }

  get targetCells(): Cell[] {
    return this.game.moves
      .filter(move => this.sourceCell === undefined || move.source === this.sourceCell)
      .reduce((accumulator, move) => ([...accumulator, move.targets[move.targets.length - 1]]), []);
  }

  isDisabled(cell: Cell) {
    if (this.sourceCell === undefined)
      return this.game.moves
        .map(move => move.source)
        .includes(cell) === false;

    if (this.sourceCell === cell)
      return false;

    return this.targetCells.includes(cell) === false;
  }

  click(cell: Cell) {
    if (cell.occupant !== undefined && cell.occupant.side === this.game.turn) {
      this.sourceCell = cell === this.sourceCell ? undefined : cell;
      return;
    }


  }

  newGame() {
    // this.form
    const board = this.gameService.createTestBoard();
    this.game = new Game(board);
  }
}
