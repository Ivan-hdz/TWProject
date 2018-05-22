import { Component, OnInit } from '@angular/core';
import {UserAccountService} from '../services/user-account.service';
import {Observable, of} from 'rxjs';
import {UserInterface, UsersInterface} from '../interfaces';
import {MyBootstrapAlert, User} from '../clases';

declare let $: any;
declare let JQuery: any;

@Component({
  selector: 'app-admin-users-manager',
  templateUrl: './admin-users-manager.component.html',
  styleUrls: ['./admin-users-manager.component.css']
})
export class AdminUsersManagerComponent implements OnInit {

  private accMge: UserAccountService;
  private registrdUsers$: Observable<UserInterface[]>;
  private myAlert: MyBootstrapAlert;
  private cacheUsers: UsersInterface;
  private sType: Number;

  constructor(am: UserAccountService) {
    this.myAlert = new MyBootstrapAlert();
    this.accMge = am;
    this.myAlert.hidden = true;
    this.sType = 0;
  }

  ngOnInit() {
    this.refreshUsers();
  }
  private refreshUsers() {
    this.accMge.getUsers().subscribe(users => {

      for (let i = 0; i < users.user.length; i++) {
        users.user[i].refNum = i + 1;
        users.user[i].actualBtnLabel = 'Modificar usuario';
      }
      this.cacheUsers = users;
      this.registrdUsers$ = of(users.user);
    });
  }
  private deleteUsr(usr: UserInterface) {
    this.accMge.deleteUser(usr).subscribe(result => {
      this.myAlert.fromRESTStatus(result);
      this.myAlert.hidden = false;
      this.refreshUsers();
    });
  }

  private edit(usr: UserInterface) {
    const buf: UserInterface = <UserInterface>{};
    if (usr.actualBtnLabel === 'Guardar') { // Si al presionar el boton tiene el texto guardar en vez de modificar usuario
      const arrHtmlEl = $('[name=' + usr.username + ']');
      if ( arrHtmlEl.length > 1 ) {
        buf.authLevel = usr.authLevel[0];
        buf.username = usr.username[0];
        buf.nickname = arrHtmlEl[0].value;
        buf.password = arrHtmlEl[1].value; // Se obtienen los datos introducidos por el usuari
      } else {
        buf.username = usr.username[0];
        buf.authLevel = 0;
        buf.nickname = 'Administrador';
        buf.password = arrHtmlEl[0].value; // Se obtienen los datos introducidos por el usuario
      }
      this.accMge.putUser(buf).subscribe(restStatus => { // Mediante un Servicio se hace llamada rest
        this.myAlert.fromRESTStatus(restStatus);
        this.myAlert.hidden = false;
        this.refreshUsers();
      });
    }
    $('[name=' + usr.username + ']').each((i, elem) => {
      elem.disabled = !elem.disabled;
      elem.disabled ? usr.actualBtnLabel = 'Modificar usuario' : usr.actualBtnLabel = 'Guardar';
    });
  }

  private  newUser(nUsrName: HTMLInputElement, nNick: HTMLInputElement, nPass: HTMLInputElement, nAuth: HTMLSelectElement) {
    const nUser: UserInterface = <UserInterface>{};
    nUser.username = nUsrName.value;
    nUser.nickname = nNick.value;
    nUser.password = nPass.value;
    nUser.authLevel = Number(nAuth.value);
    this.accMge.postUser(nUser).subscribe(restStatus => {
      this.myAlert.fromRESTStatus(restStatus);
      this.myAlert.hidden = false;
      if (this.myAlert.type === 'success') {
        nUsrName.value = '';
        nNick.value = '';
        nPass.value = '';
        nAuth.value = '0';
      }
      this.refreshUsers();
    });
  }
  private search(txt: String) {
    const arr: UserInterface[] = new Array<UserInterface>();
    this.cacheUsers.user.forEach(usr => {
      if (usr.username.indexOf( txt.toString() ) >= 0 && this.sType === 0) {
        arr.push(usr);
      }
      if (usr.nickname.indexOf( txt.toString() ) >= 0 && this.sType === 1) {
        arr.push(usr);
      }
    });
    this.registrdUsers$ = of(arr);
  }

}
