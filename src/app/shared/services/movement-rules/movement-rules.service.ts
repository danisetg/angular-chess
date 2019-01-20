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
      case 'rook':
        return this.isAvalidRookMove(piece, destinationRow, destinationColumn, position);
      case 'bishop':
        return this.isAvalidBishopMove(piece, destinationRow, destinationColumn, position);
      case 'queen':
        return this.isAvalidQueenMove(piece, destinationRow, destinationColumn, position);
      case 'king':
        return this.isAvalidKingMove(piece, destinationRow, destinationColumn, position);
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
  private isAvalidRookMove (piece: Piece, destinationRow: number, destinationColumn: string, position: any[]): boolean {
    if (position[destinationRow][destinationColumn] && position[destinationRow][destinationColumn].color === piece.color) {
      return false;
    } else if (destinationRow !== piece.row && destinationColumn !== piece.column) {
      return false;
    } else if (piece.row === destinationRow) {
      return this.isRowPathEmpty(piece.row, piece.column, destinationColumn, position);
    } else {
      return this.isColumnPathEmpty(piece.column, piece.row, destinationRow, position);
    }
  }
  private isAvalidBishopMove (piece: Piece, destinationRow: number, destinationColumn: string, position: any[]): boolean {
    if (position[destinationRow][destinationColumn] && position[destinationRow][destinationColumn].color === piece.color) {
      return false;
    } else if (Math.abs(destinationRow - piece.row) !== this.columnsDifference(destinationColumn, piece.column)) {
      return false;
    } else {
      return this.isDiagonalPathEmpty(piece.row, piece.column, destinationRow, destinationColumn, position);
    }
  }
  private isAvalidQueenMove (piece: Piece, destinationRow: number, destinationColumn: string, position: any[]): boolean {
     return this.isAvalidRookMove(piece, destinationRow, destinationColumn, position) ||
       this.isAvalidBishopMove(piece, destinationRow, destinationColumn, position);
  }
  private isAvalidKingMove (piece: Piece, destinationRow: number, destinationColumn: string, position: any[]): boolean {
    if (position[destinationRow][destinationColumn] && position[destinationRow][destinationColumn].color === piece.color) {
      return false;
    } else {
      if (Math.abs(piece.row - destinationRow) <= 1 && this.columnsDifference(piece.column, destinationColumn) <= 1) {
        return true;
      } else {
        return false;
      }
    }
  }
  isColumnPathEmpty(column: string, initialRow: number, finalRow: number, position) {
      if (initialRow > finalRow) {
        const tmp = initialRow;
        initialRow = finalRow;
        finalRow = tmp;
      }
      for (let i = initialRow + 1; i < finalRow; i++) {
        if (position[i][column]) {
          return false;
        }
      }
      return true;
  }
  isRowPathEmpty(row: number, initialColumn: string, finalColumn: string, position) {
    if (this.columns.indexOf(initialColumn) > this.columns.indexOf(finalColumn)) {
      const tmp = initialColumn;
      initialColumn = finalColumn;
      finalColumn = tmp;
    }
    for (let i = this.columns.indexOf(initialColumn) + 1; i < this.columns.indexOf(finalColumn); i++) {
      if (position[row][this.columns[i]]) {
        return false;
      }
    }
    return true;
  }
  isDiagonalPathEmpty(initialRow: number, initialColumn: string, finalRow: number, finalColumn: string, position) {
    const rowIncr = initialRow < finalRow ? 1 : -1;
    const colIncr = this.columns.indexOf(initialColumn) < this.columns.indexOf(finalColumn) ? 1 : -1;
    for (let i = initialRow + rowIncr,  h = this.columns.indexOf(initialColumn) + colIncr; i !== finalRow; i += rowIncr, h += colIncr) {
      console.log(i, this.columns[h], position[i][this.columns[h]])
      if (position[i][this.columns[h]]) {
        return false;
      }
    }
    return true;
  }
  columnsDifference(col1: string, col2: string): number {
    return Math.abs(this.columns.indexOf(col1) - this.columns.indexOf(col2));
  }
}
