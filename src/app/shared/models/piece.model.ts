import {Board} from './board.model';

export class Piece {
  constructor(
    public id?: number,
    public name?: 'pawn' | 'rook' | 'bishop' | 'knight' | 'queen' | 'king',
    public row?: number,
    public column?: string,
    public eaten?: boolean,
    public color?: 'white' | 'black',
    public board?: Board,
  ) {
  }
}
