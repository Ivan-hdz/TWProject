import { Component, OnInit } from '@angular/core';
import {CurrentUserService} from '../services/current-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cUser: CurrentUserService;
  role: String;
  constructor(c: CurrentUserService) {
    this.cUser = c;
  }

  ngOnInit() {
    if(this.cUser.getAuthLevel() == 0) {
      this.role = 'Administrador';
    } else if(this.cUser.getAuthLevel() == 1) {
      this.role = 'Profesor';
    } else {
      this.role = 'Alumno';
    }
  }

  logout() {
    this.cUser.logout();
  }

}
