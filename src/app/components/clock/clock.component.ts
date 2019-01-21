import {Component, Input, OnInit} from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  @Input() minutes: number;
  @Input() seconds: number;
  @Input() playing: boolean;
  constructor() { }

  ngOnInit() {
    this.playClock();
  }
  playClock() {
    if (this.seconds === 0) {
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    if (this.playing) {
      setTimeout( timeout => {
        this.playClock();
      }, 1000);
    }
  }

}
