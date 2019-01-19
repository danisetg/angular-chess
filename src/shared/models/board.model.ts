import {User} from './user.model';
import {Piece} from './piece.model';

export class Board {
  public id: number;
  public whiteUser: User;
  public blackUser: User;
  public pieces: Piece[];
}
