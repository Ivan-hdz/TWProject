import {Component, OnInit} from '@angular/core';
import {UserAccountService} from '../services/user-account.service';
import {CurrentUserService} from '../services/current-user.service';
/*
* Componente encargado de redireccionar al login o al homepage
* si no esta autentificado el usuario
* Cuando un usuario inicia sesion se crea un tokens que se almacena
* en el servidor y en el localstorage del cliente
* Si los tokens son diferentes, no pasa la autentificacion
* Si el token del cliente existe y e del servidor no, inicia sesion
* Si el token del cliente no existe, no pasa la autentificacion
* */
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
