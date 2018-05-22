import { Component, OnInit } from '@angular/core';
import {CurrentUserService} from '../services/current-user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public cUser: CurrentUserService;
  public router: Router;

  constructor(cUser: CurrentUserService, router: Router) {

    this.cUser = cUser;
    this.router = router;
  }

  ngOnInit() {
  }
  public go(str: String): void
  {
    this.router.navigate([str]);
  }
  public logout(): void
  {
    this.cUser.logout();
    this.go('/index');
  }

}
