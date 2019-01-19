import {Component, OnInit} from '@angular/core';
import {Board} from '../shared/models/board.model';
import {Piece} from '../shared/models/piece.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chessGame';
  ngOnInit() {
  }
}
