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
      case 'knight':
        return this.isAvalidKnightMove(piece, destinationRow, destinationColumn, position);
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
      } else if (Math.abs(this.columnsDifference(piece.column, destinationColumn)) === 1) {
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
  private isAvalidKnightMove (piece: Piece, destinationRow: number, destinationColumn: string, position: any[]): boolean {
    if (position[destinationRow][destinationColumn] && position[destinationRow][destinationColumn].color === piece.color) {
      return false;
    } else {
      if (Math.abs(piece.row - destinationRow) === 1 && this.columnsDifference(piece.column, destinationColumn) === 2) {
        return true;
      } else if (Math.abs(piece.row - destinationRow) === 2 && this.columnsDifference(piece.column, destinationColumn) === 1) {
        return true;
      }
      return false;
    }
  }
  columnsDifference(col1: string, col2: string): number {
    return Math.abs(this.columns.indexOf(col1) - this.columns.indexOf(col2));
  }
}
