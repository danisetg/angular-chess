import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {MatGridListModule} from '@angular/material';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
