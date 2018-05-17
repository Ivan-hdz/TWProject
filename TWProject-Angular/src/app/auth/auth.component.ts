import {Component, OnInit} from '@angular/core';
import {UserAccountService} from '../shared/services/user-account.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  private userApi: UserAccountService;

  constructor(userAccApi: UserAccountService) {
    this.userApi = userAccApi;
  }

  ngOnInit() {
    this.userApi.getUsers().subscribe(users => {
        console.log(users.user[0].authLevel);
    }, error => {
        console.log(error);
      });
  }

  isAuth()
  {
    return false;
  }

}
