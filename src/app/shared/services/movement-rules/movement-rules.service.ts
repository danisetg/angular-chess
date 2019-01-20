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
  isKingBeingAttacked(piece, destinationRow, destinationColumn, position) {
    const newPosition = [];
    let kingRow = 1;
    let kingColumn = 'a';
    for (let i = 1; i <= 8; i++) {
      newPosition[i] = [];
      for (let h = 0; h < 8; h++) {
        if (position[i][this.columns[h]]) {
          newPosition[i][this.columns[h]] = {
            name: position[i][this.columns[h]].name,
            color: position[i][this.columns[h]].color,
            row: position[i][this.columns[h]].row,
            column: position[i][this.columns[h]].column,
          };
        }
        if (position[i][this.columns[h]] && position[i][this.columns[h]].name === 'king' &&
          position[i][this.columns[h]].color === piece.color) {
          kingRow = i;
          kingColumn = this.columns[h];
        }
      }
    }
    newPosition[destinationRow][destinationColumn] = {
      name: piece.name,
      color: piece.color,
      row: piece.row,
      column: piece.column,
    };
    if (newPosition[destinationRow][destinationColumn].name === 'king') {
      kingRow = destinationRow;
      kingColumn = destinationColumn;
    }
    newPosition[piece.row][piece.column] = null;
    newPosition[destinationRow][destinationColumn].row = destinationRow;
    newPosition[destinationRow][destinationColumn].column = destinationColumn;
    for (let i = 1; i <= 8; i++) {
      for (let h = 1; h <= 8; h++) {
        if (newPosition[i][this.columns[h]] && newPosition[i][this.columns[h]].color !== piece.color ) {
          console.log(newPosition[i][this.columns[h]], kingRow, kingColumn, this.isAvalidMove(newPosition[i][this.columns[h]], kingRow, kingColumn, newPosition) );
          if (this.isAvalidMove(newPosition[i][this.columns[h]], kingRow, kingColumn, newPosition)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private isAvalidPawnMove(piece: Piece, destinationRow: number, destinationColumn: string, position: any[]): boolean {
    const validDifference = piece.color === 'white' ? 1 : -1;
    const initialRow = piece.color === 'white' ? 2 : 7;
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
