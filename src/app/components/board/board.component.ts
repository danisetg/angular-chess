import {Component, Input, OnInit} from '@angular/core';
import {Board} from '../../shared/models/board.model';
import {MovementRulesService} from '../../shared/services/movement-rules/movement-rules.service';

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
  constructor(private movementRulesService: MovementRulesService) { }

  ngOnInit() {
    this.board = new Board();
    this.board.pieces = [];
    this.setInitialPosition();
    this.screenHeight = (window.innerHeight / 1.4 ) + 'px';
    this.piecesSize = ((window.innerHeight / 1.4 ) / 10) + 'px';
    window.onresize = () => {
      this.screenHeight = (window.innerHeight / 1.4 ) + 'px';
      this.piecesSize = ((window.innerHeight / 1.4 ) / 10) + 'px';
    };
  }
  onPieceClick(piece) {
    if (this.board.turn === piece.color) {
      if (this.selectedPiece && this.selectedPiece === piece) {
        this.selectedPiece = null;
      } else if (!this.selectedPiece) {
        this.selectedPiece = piece;
      }
    }
  }
  onTileClick(row, column) {
    if (this.selectedPiece && (this.selectedPiece.row !== row || this.selectedPiece.column !== column) ) {
      if (this.movementRulesService.isAvalidMove(this.selectedPiece, row, column, this.position) &&
        !this.movementRulesService.isKingBeingAttacked(this.selectedPiece, row, column, this.position)) {
          this.position[this.selectedPiece.row][this.selectedPiece.column] = null;
          this.selectedPiece.row = row;
          this.selectedPiece.column = column;
          this.position[row][column] = this.selectedPiece;
          this.selectedPiece = null;
          this.changeTurn();
      } else if (this.position[row][column] && this.position[row][column].color === this.selectedPiece.color) {
        this.selectedPiece = this.position[row][column];
      } else {
        this.selectedPiece = null;
      }
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
      this.board.pieces.push({row: 7, column: this.columns[i - 1], eaten: false, color: 'black', name: 'pawn'});
      this.position[i] = [];
    }
    this.board.pieces.push({row: 1, column: 'a', eaten: false, color: 'white', name: 'rook'});
    this.board.pieces.push({row: 1, column: 'h', eaten: false, color: 'white', name: 'rook'});
    this.board.pieces.push({row: 8, column: 'a', eaten: false, color: 'black', name: 'rook'});
    this.board.pieces.push({row: 8, column: 'h', eaten: false, color: 'black', name: 'rook'});
    this.board.pieces.push({row: 1, column: 'b', eaten: false, color: 'white', name: 'knight'});
    this.board.pieces.push({row: 1, column: 'g', eaten: false, color: 'white', name: 'knight'});
    this.board.pieces.push({row: 8, column: 'b', eaten: false, color: 'black', name: 'knight'});
    this.board.pieces.push({row: 8, column: 'g', eaten: false, color: 'black', name: 'knight'});
    this.board.pieces.push({row: 1, column: 'c', eaten: false, color: 'white', name: 'bishop'});
    this.board.pieces.push({row: 1, column: 'f', eaten: false, color: 'white', name: 'bishop'});
    this.board.pieces.push({row: 8, column: 'c', eaten: false, color: 'black', name: 'bishop'});
    this.board.pieces.push({row: 8, column: 'f', eaten: false, color: 'black', name: 'bishop'});
    this.board.pieces.push({row: 1, column: 'd', eaten: false, color: 'white', name: 'queen'});
    this.board.pieces.push({row: 1, column: 'e', eaten: false, color: 'white', name: 'king'});
    this.board.pieces.push({row: 8, column: 'd', eaten: false, color: 'black', name: 'queen'});
    this.board.pieces.push({row: 8, column: 'e', eaten: false, color: 'black', name: 'king'});
    this.board.turn = 'white';
    this.setPosition();
  }
  changeTurn() {
    if (this.board.turn === 'white') {
      this.board.turn = 'black';
    } else {
      this.board.turn = 'white';
    }
  }
}
