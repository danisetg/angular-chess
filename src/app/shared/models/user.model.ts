import {Board} from './board.model';

export class User {
  public id: number;
  public userName: string;
  public email: string;
  public boards: Board[];
  public gamesPlayed: number;
  public victories: number;
}
