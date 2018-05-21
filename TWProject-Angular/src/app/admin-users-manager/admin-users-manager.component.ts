import { Component, OnInit } from '@angular/core';
import {UserAccountService} from '../services/user-account.service';
import {Observable, of} from 'rxjs';
import {UserInterface} from '../interfaces';
import {MyBootstrapAlert} from '../clases';

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

  constructor(am: UserAccountService) {
    this.myAlert = new MyBootstrapAlert();
    this.accMge = am;
    this.myAlert.hidden = true;
  }

  ngOnInit() {
    this.accMge.getUsers().subscribe(users => {
      for (let i = 0; i < users.user.length; i++) {
        users.user[i].refNum = i + 1;
        users.user[i].actualBtnLabel = 'Modificar usuario';
      }
      this.registrdUsers$ = of(users.user);
    });
  }

  private deleteUsr(usr: UserInterface) {
    this.accMge.deleteUser(usr).subscribe(result => {
      this.myAlert.fromRESTStatus(result);
      this.myAlert.hidden = false;
    });
  }

  private edit(usr: UserInterface) {
    if (usr.actualBtnLabel == 'Guardar') { // Si al presionar el boton tiene el texto guardar en vez de modificar usuario
      const arrHtmlEl = $('[name=' + usr.username + ']');
      usr.username = arrHtmlEl[0].value;
      usr.nickname = arrHtmlEl[1].value; // Se obtienen los datos introducidos por el usuario
      this.accMge.putUser(usr).subscribe(restStatus => { // Mediante un Servicio se hace llamada rest
        this.myAlert.fromRESTStatus(restStatus);
        this.myAlert.hidden = false;
      });
    }
    $('[name=' + usr.username + ']').each((i, elem) => {
      elem.disabled = !elem.disabled;
      elem.disabled ? usr.actualBtnLabel = 'Modificar usuario' : usr.actualBtnLabel = 'Guardar';
    });
  }

}
