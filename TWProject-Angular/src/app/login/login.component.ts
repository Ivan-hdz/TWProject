import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CurrentUserService} from '../services/current-user.service';
import {MyBootstrapAlert} from '../clases';
/*
* Componente que consume el metodo de iniciar sesion
* del servicio current users
* */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  router: Router;
  cUser: CurrentUserService;
  public myAlert: MyBootstrapAlert;

  constructor(rout: Router, currentUser: CurrentUserService) {
    this.router = rout;
    this.cUser = currentUser;
    this.myAlert = new MyBootstrapAlert();
  }

  ngOnInit() {
    this.myAlert.hidden = true;
  }

  login(user: String, pass: String) {
    let flag = false;
    this.myAlert.clearAlert();
    this.cUser.clearUser();
    this.cUser.setUsername(user);
    this.cUser.setPassword(pass);
    if (this.cUser.login()) {
      this.myAlert.hidden = true;
      this.router.navigate(['/home']);
      return true;
    } else {
      this.myAlert.body = 'Algo ha salido mal, verifica tu usuario o contraseña, o bien, intenta más tarde.';
      this.myAlert.type = 'Error: ';
      this.myAlert.type = MyBootstrapAlert.DANGER;
      this.myAlert.hidden = false;
      return false;
    }
  }
}
