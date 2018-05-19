import { Component, OnInit } from '@angular/core';
import {CurrentUserService} from '../services/current-user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private cUser: CurrentUserService;
  private router: Router;

  constructor(cUser: CurrentUserService, router: Router) {

    this.cUser = cUser;
    this.router = router;
  }

  ngOnInit() {
  }
  private go(str: String): void
  {
    this.router.navigate([str]);
  }
  private logout(): void
  {
    this.cUser.logout();
    this.go('/index');
  }

}
