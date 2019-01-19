import {Board} from './board.model';

export class Piece {
  constructor(
    public id?: number,
    public name?: string,
    public row?: number,
    public column?: string,
    public eaten?: boolean,
    public color?: 'white' | 'black',
    public board?: Board,
  ) {
  }
}
