import { Component } from '@angular/core';
import { Form, Game } from '../models';
import { GameService } from './game.service';

@Component({
  selector: 'checkers-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  game!: Game;
  form = new Form();

  constructor(private gameService: GameService) {
    this.newGame();
  }

  newGame() {
    const board = this.gameService.createBoard(this.form);
    this.game = new Game(board);
  }
}
