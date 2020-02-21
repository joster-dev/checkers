import { Cell } from './cell';

export class Game {
  constructor(public cells: Cell[], public turn: 'a' | 'b' = 'a') { }
}
