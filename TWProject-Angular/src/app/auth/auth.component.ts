import {Component, OnInit} from '@angular/core';
import {UserAccountService} from '../services/user-account.service';
import {CurrentUserService} from '../services/current-user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  public cUser: CurrentUserService;

  constructor(cUser: CurrentUserService) {
    this.cUser = cUser;
  }

  ngOnInit() {

  }
  public check()
  {
    return this.cUser.isAuth();
  }
}
