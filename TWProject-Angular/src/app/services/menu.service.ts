import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Menu, MenuItem} from '../interfaces';
import {map} from 'rxjs/internal/operators';
import {ITEMS_ADMIN, ITEMS_ALUMNO, ITEMS_PROF} from '../shared/values/strings';

export const MENU_ADMIN: Number = 0;
export const MENU_PROFE: Number = 1;
export const MENU_ALUMNO: Number = 2;

@Injectable()
export class MenuService {

  private menu: Menu = <Menu>{};

  public getMenu(): Observable<Menu> {
    return this.getMenuObservable();
  }

  public switchMenu(newMenuType: Number): Observable<Menu> {
    return this.getMenuObservable().pipe(map(() => {
      this.setMenuType(newMenuType);
      return this.menu;
    }));
  }

  public setMenuType(type: Number) {
    if (type == MENU_ADMIN) {
      this.setMenuAdmin();
    } else if (type == MENU_PROFE) {
      this.setMenuProfe();
    } else {
      this.setMenuAlumno();
    }
  }

  private setMenuAdmin() {
    this.menu.menuItems = ITEMS_ADMIN;
  }
  private setMenuProfe() {
    this.menu.menuItems = ITEMS_PROF;
  }
  private setMenuAlumno() {
    this.menu.menuItems = ITEMS_ALUMNO;
  }
  private  getMenuObservable(): Observable<Menu> {
    return of(this.menu);
  }
}
