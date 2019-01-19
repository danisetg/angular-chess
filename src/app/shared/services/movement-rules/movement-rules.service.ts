import {Injectable} from '@angular/core';
import {Piece} from '../../models/piece.model';

@Injectable({
  providedIn: 'root'
})
export class MovementRulesService {
  columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  constructor() {
  }

  isAvalidMove(piece: Piece, destinationRow: number, destinationColumn: string, position: any[]): boolean {
    switch (piece.name) {
      case 'pawn':
        return this.isAvalidPawnMove(piece, destinationRow, destinationColumn, position);
    }
    return false;
  }

  private isAvalidPawnMove(piece: Piece, destinationRow: number, destinationColumn: string, position: any[]): boolean {
    const validDifference = piece.color === 'white' ? 1 : -1;
    const initialRow = piece.color === 'white' ? 2 : 7;
    console.log(validDifference, initialRow, piece, destinationRow, destinationColumn);
    if (destinationRow - piece.row === validDifference) {
      if (destinationColumn === piece.column && !position[destinationRow][destinationColumn]) {
        return true;
      } else if (Math.abs(this.columns.indexOf(destinationColumn) - this.columns.indexOf(piece.column)) === 1) {
        if (position[destinationRow][destinationColumn] && position[destinationRow][destinationColumn].color !== piece.color) {
          return true;
        }
        return false;
          }
      return false;
    } else if (destinationRow - piece.row - validDifference === validDifference) {
      if (piece.row === initialRow && piece.column === destinationColumn && !position[destinationRow][destinationColumn]) {
        return true;
      }
      return false;
    }
    return false;
  }
}
