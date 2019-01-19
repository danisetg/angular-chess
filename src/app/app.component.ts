import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from './shared/services/menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sideMenu: any[];
  screenWidth: number;
  screenHeigth: string;
  sidenavMode = 'side';
  sidenavOpened = true;
  constructor(public menuService: MenuService,
              private router: Router) {
    this.sideMenu =  this.menuService.sideMenu;
    this.screenWidth = window.innerWidth;
    this.screenHeigth = (window.innerHeight - 80) + 'px';
    this.sidenavOpened = this.screenWidth > 840;
    this.sidenavMode = this.screenWidth > 840 ? 'side' : 'over';
    console.log(this.screenHeigth);
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.sidenavMode = this.screenWidth > 840 ? 'side' : 'over';
      this.screenHeigth = (window.innerHeight - 80) + 'px';
      this.sidenavOpened = this.screenWidth > 840;
    };
  }
  ngOnInit() {
  }

  /**
   * Handles the menu click event
   * @param menu
   */
  onMenuClick(menu) {
    if (menu.sub) {
      menu.opened = !menu.opened;
    } else {
      this.router.navigate([menu.link]);
    }
  }

  /**
   * Opens and closes the sidenav
   */
  toggleSideNav () {
    this.sidenavOpened = !this.sidenavOpened;
  }

}
