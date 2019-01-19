import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardComponent} from './components/board/board.component';

const appRoutes: Routes = [
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'board', component: BoardComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
