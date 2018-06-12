import { Component, OnInit } from '@angular/core';
import {MyBootstrapAlert} from '../clases';
import {UserAccountService} from '../services/user-account.service';
import {UserInterface} from '../interfaces';
/*
* Componente encargado de llevar la logica de inicio de sesion
* Consume el metodo registrar del useraccount service
* */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public valid: boolean;
  public myAlert: MyBootstrapAlert;
  private accM: UserAccountService;

  constructor(acc: UserAccountService) {
    this.valid = false;
    this.myAlert = new MyBootstrapAlert();
    this.accM = acc;
  }

  ngOnInit() {
    this.myAlert.hidden = true;
  }

  public signup(username: String, nickname: String, pass: String) {
    if ( !this.valid ) {
      this.myAlert.title = 'Error: ';
      this.myAlert.type = MyBootstrapAlert.DANGER;
      this.myAlert.body = 'Las contraseñas no coinciden';
      this.myAlert.hidden = false;
    } else {
      const user: UserInterface = <UserInterface>{};
      user.username = username;
      user.password = pass;
      user.nickname = nickname;
      user.authLevel = 2;
      this.accM.postUser(user).subscribe(restStatus => {
        this.myAlert.fromRESTStatus(restStatus);
        if (this.myAlert.type === MyBootstrapAlert.SUCCESS) {
          this.myAlert.body = ' Tu cuenta se ha creaado exitosamente, procede a iniciar sesión';
        }
        this.myAlert.hidden = false;
      });
    }
    return false;
  }
  public bothMatch(p: HTMLInputElement, cP: HTMLInputElement): boolean {
    let colorBorder = '';
    this.valid = p.value === cP.value;
    this.valid ? colorBorder = '#44bd32' : colorBorder = '#c23616';
    p.style.borderColor = colorBorder;
    cP.style.borderColor = colorBorder;
    return this.valid;
  }

}
