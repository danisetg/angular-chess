import { Component, OnInit } from '@angular/core';
import {Board} from '../../../shared/models/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board;
  selectedPiece: any;
  piecesSize: string;
  screenHeight: string;
  rows = [8, 7, 6, 5, 4, 3, 2, 1];
  columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  position: any[];
  tiles: any[];
  constructor() { }

  ngOnInit() {
    this.board = new Board();
    this.board.pieces = [];
    this.setInitialPosition();
    this.screenHeight = (window.innerHeight - 50) + 'px';
    this.piecesSize = ((window.innerHeight - 50) / 10) + 'px';
    window.onresize = () => {
      this.screenHeight = (window.innerHeight - 50) + 'px';
      this.piecesSize = ((window.innerHeight - 50) / 10) + 'px';
    };
  }
  onPieceClick(piece) {
    if (this.selectedPiece && this.selectedPiece === piece) {
      this.selectedPiece = null;
    } else if (!this.selectedPiece) {
      this.selectedPiece = piece;
    }
  }
  onTileClick(row, column) {
    if (this.selectedPiece && (this.selectedPiece.row !== row || this.selectedPiece.column !== column)) {
      this.position[this.selectedPiece.row][this.selectedPiece.column] = null;
      this.selectedPiece.row = row;
      this.selectedPiece.column = column;
      this.position[row][column] = this.selectedPiece;
      this.selectedPiece = null;
    }
  }
  getColor(row, column) {
    if ( (row + this.columns.indexOf(column)) % 2) {
      return 'green';
    } else {
      return 'lightgray';
    }
  }
  setPosition() {
    this.board.pieces.forEach(piece => {
      if (!this.position[piece.row]) {
        this.position[piece.row] = [];
      }
      this.position[piece.row][piece.column] = piece;
    });
  }
  setInitialPosition() {
    this.position = [];
    for (let i = 1; i <= 8; i++) {
      this.board.pieces.push({row: 2, column: this.columns[i - 1], eaten: false, color: 'white', name: 'pawn'});
      this.position[i] = [];
    }
    this.board.pieces.push({row: 1, column: 'a', eaten: false, color: 'white', name: 'rook'});
    this.board.pieces.push({row: 1, column: 'h', eaten: false, color: 'white', name: 'rook'});
    this.board.pieces.push({row: 1, column: 'b', eaten: false, color: 'white', name: 'knight'});
    this.board.pieces.push({row: 1, column: 'g', eaten: false, color: 'white', name: 'knight'});
    this.board.pieces.push({row: 1, column: 'c', eaten: false, color: 'white', name: 'bishop'});
    this.board.pieces.push({row: 1, column: 'f', eaten: false, color: 'white', name: 'bishop'});
    this.board.pieces.push({row: 1, column: 'd', eaten: false, color: 'white', name: 'queen'});
    this.board.pieces.push({row: 1, column: 'e', eaten: false, color: 'white', name: 'king'});
    this.setPosition();
  }

}
