import { Component } from '@angular/core';
import { Cell } from '../models/cell';
import { Game } from '../models/game';

@Component({
  selector: 'checkers-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  game!: Game;

  constructor() {
    this.newGame();
  }


  newGame() {
    this.game = new Game(this.createGrid());
  }


  private createGrid(): Cell[] {
    const temp: Cell[] = [];
    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 7; y++) {
        temp.push(new Cell(x, y));
      }
    }
    return temp;
  }
}
