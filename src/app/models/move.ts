import { Cell } from './cell';

export interface Move {
  source: Cell;
  targets: Cell[];
}
