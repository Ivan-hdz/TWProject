import { Component } from '@angular/core';
import {CurrentUserService} from './services/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cUser: CurrentUserService;
  constructor(cUser: CurrentUserService) {
    this.cUser = cUser;
  }
  public check()
  {
    return this.cUser.isLoggedIn();
  }
}
