import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CurrentUserService} from '../services/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  router: Router;
  cUser: CurrentUserService;

  constructor(rout: Router, currentUser: CurrentUserService) {
    this.router = rout;
    this.cUser = currentUser;
  }

  ngOnInit() {

  }

  login(user: String, pass: String) {
    this.cUser.clearUser();
    this.cUser.setUsername(user);
    this.cUser.setPassword(pass);
    if (this.cUser.login()) {
      this.router.navigate(['/home']);
    } else {
      return false;
    }
  }

}
