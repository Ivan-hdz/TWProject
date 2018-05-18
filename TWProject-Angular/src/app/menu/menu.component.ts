import { Component, OnInit } from '@angular/core';
import {MenuService} from '../services/menu.service';
import {Observable, of} from 'rxjs';
import {Menu, MenuItem} from '../interfaces';
import {CurrentUserService} from '../services/current-user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private menu$: Observable<Menu>;
  private menu_items$: Observable<MenuItem[]>;

  constructor(menu: MenuService, cUser: CurrentUserService) {
    console.log(cUser.getAuthLevel());
    menu.setMenuType(cUser.getAuthLevel());
    this.menu$ = menu.getMenu();
  }

  ngOnInit() {
    this.menu$.subscribe(menu => {
      this.menu_items$ = of(menu.menuItems);
    });
  }

}
