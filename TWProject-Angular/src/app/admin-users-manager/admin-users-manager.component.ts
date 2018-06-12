import { Component, OnInit } from '@angular/core';
import {UserAccountService} from '../services/user-account.service';
import {Observable, of} from 'rxjs';
import {UserInterface, UsersInterface} from '../interfaces';
import {MyBootstrapAlert, User} from '../clases';
import {isSubstring} from '../shared/values/strings';
import {CurrentUserService} from '../services/current-user.service';
import {map} from 'rxjs/internal/operators';
/*
* Componente que se encarga de ejecutar las
* altas. bajas, cambios y consultas de los usuarios registrados
* solo el admnistrador puede ver este componente
* */
declare let $: any;
declare let JQuery: any;

@Component({
  selector: 'app-admin-users-manager',
  templateUrl: './admin-users-manager.component.html',
  styleUrls: ['./admin-users-manager.component.css']
})
export class AdminUsersManagerComponent implements OnInit {

  public accMge: UserAccountService;
  public registrdUsers$: Observable<UserInterface[]>;
  public myAlert: MyBootstrapAlert;
  public cacheUsers: UsersInterface;
  public sType: Number;
  private cUser: CurrentUserService;
  loading: boolean;

  constructor(am: UserAccountService, currentUser: CurrentUserService) {
    this.myAlert = new MyBootstrapAlert();
    this.accMge = am;
    this.myAlert.hidden = true;
    this.sType = 0;
    this.cUser = currentUser;
    this.loading = true;
  }

  ngOnInit() {
    this.refreshUsers();
  }
  public refreshUsers() {
    this.loading = true;
    this.accMge.getUsers().subscribe(users => {
      this.cacheUsers = users;
      this.registrdUsers$ = of(users.user);
      this.loading = false;
    });
  }
  public deleteUsr(usr: UserInterface) {
    this.accMge.deleteUser(usr).subscribe(result => {
      this.myAlert.fromRESTStatus(result);
      this.myAlert.hidden = false;
      this.refreshUsers();
    });
  }

  public edit(usr: UserInterface) {
    const buf: UserInterface = <UserInterface>{};
    const btn: any = $('#' + usr.username + '_btnEdit');
    if ( btn.val() === 'Guardar') { // Si al presionar el boton tiene el texto guardar
        buf.authLevel = $('#' + usr.username + '_auth').val();
        buf.username = $('#' + usr.username + '_usr').val();
        buf.nickname = $('#' + usr.username + '_nick').val();
        buf.password = $('#' + usr.username + '_pass').val(); // Se obtienen los datos introducidos por el usuario

      if (usr.username.toString() == this.cUser.getUsername().toString()) {
        console.log('Sending to observ');
        this.cUser.updateCurrentNickname(buf.nickname);
      }
      this.accMge.putUser(buf).subscribe(restStatus => { // Mediante un Servicio se hace llamada rest
        this.myAlert.fromRESTStatus(restStatus);
        this.myAlert.hidden = false;
        this.refreshUsers();
      });
    }
    if (usr.authLevel[0] != '0') {
      $('#' + usr.username + '_auth').prop('disabled', !$('#' + usr.username + '_auth').prop('disabled') );
    }
    $('#' + usr.username + '_nick').prop('disabled', !$('#' + usr.username + '_nick').prop('disabled') );
    $('#' + usr.username + '_pass').prop('disabled', !$('#' + usr.username + '_pass').prop('disabled') );
    $('#' + usr.username + '_pass').prop('disabled') ? btn.val('Editar usuario')  : btn.val('Guardar');
    return false;
  }

  public  newUser(nUsrName: HTMLInputElement, nNick: HTMLInputElement, nPass: HTMLInputElement, nAuth: HTMLSelectElement) {
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
    return false;
  }
  public search(txt: String) {
    const arr: UserInterface[] = new Array<UserInterface>();
    this.cacheUsers.user.forEach(usr => {
      if (isSubstring(usr.username.toString(), txt.toString()) && this.sType === 0) {
        arr.push(usr);
      }
      if (usr.nickname.indexOf( txt.toString() ) >= 0 && this.sType === 1) {
        arr.push(usr);
      }
    });
    this.registrdUsers$ = of(arr);
  }

}
