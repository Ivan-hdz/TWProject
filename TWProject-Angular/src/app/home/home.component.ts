import { Component, OnInit } from '@angular/core';
import {CurrentUserService} from '../services/current-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cUser: CurrentUserService;
  constructor(c: CurrentUserService) {
    this.cUser = c;
  }

  ngOnInit() {
  }

  logout() {
    this.cUser.logout();
  }

}
