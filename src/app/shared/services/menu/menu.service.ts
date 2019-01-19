import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public sideMenu = [
    {
      title: 'Tablero',
      icon: 'grid_on',
      link: '/board'
    },
  ];
  constructor() { }
}
