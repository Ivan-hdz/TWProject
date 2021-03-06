import { Injectable } from '@angular/core';
import {RESTStatus, UserInterface} from '../interfaces';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {restEndpoint} from '../shared/values/strings';
import {ParseFormatService} from './parse-format.service';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class CurrentUserService {
  private loggedIn: Boolean;
  private _user: UserInterface;
  private http: HttpClient;
  private parser: ParseFormatService;
  cUserNickname$: Observable<String>;
  private cUserNicknameSubject: Subject<String> = new Subject();

  constructor( ht: HttpClient, parser: ParseFormatService) {
    this.loggedIn = false;
    this.http = ht;
    this.parser = parser;
    // buscamos la informacion del usuario en el localstorage del navegador
    if (localStorage.user) {
      this._user = JSON.parse(localStorage.user);
    } else {
      this._user = <UserInterface>{};
    }
    // buscamos si ha iniciado sesion anteriormente el clientoe
    if (localStorage.logged) {
      this.loggedIn = JSON.parse(localStorage.logged);
    } else {
      this.loggedIn = false;
    }
    this.cUserNickname$ = this.cUserNicknameSubject.asObservable();
  }

  public getCurrentUser(): UserInterface {
    return this._user;
  }

  public setUsername(usrname: String) {
    this._user.username = usrname;
  }

  public  setPassword(pass: String) {
    this._user.password = pass;
  }

  public getUsername(): String {
    return this._user.username;
  }

  public setNickname(nick: String) {
    this._user.nickname = nick;
  }

  public getNickname() {
    return this._user.nickname;
  }

  public getAuthLevel(): Number {
    return this._user.authLevel;
  }

  public isLoggedIn() {
    return this.loggedIn;
  }
  // Autentificamos al usuario mandando al servidor un token creado al iniciar sesion
  public isAuth(): boolean {

    this.authHttpRequest(this._user.sessionToken).subscribe(result => {
      if (result.status[0] >= 200 && result.status[0] < 400) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      }).unsubscribe();
    return this.loggedIn.valueOf();
  }

  public getCurrentUserObservable(): Observable<String> {
    return this.cUserNickname$;
  }
  // actializamos los datos en el localstorage del navegador
  public updateCurrentNickname(nickname: String): void {
    this.cUserNicknameSubject.next(nickname);
    this._user.nickname = nickname;
    localStorage.user = JSON.stringify(this._user);
  }
/* iniciamos sesion, mandando una peticion al servidor con
  nombre de usuario y contraseña mediante peticion POST
  */
  public login(): Boolean {
    // Aqui mando un request de login y me devuelve el authLevel
    this.loginHttpRequest(this.getUsername(), this._user.password).pipe(map(usrXML =>  this.parser.xmlToJson(usrXML))).subscribe(usr => {
      if (usr.username != 'error') {
        // Si el nombre de usuario es diferente a error,
        // ha iniciado sesion correctamente
        // console.log(usr);
        this.loggedIn = true;
        this._user.authLevel = usr.authLevel;
        this._user.nickname = usr.nickname;
        this._user.username = usr.username;
        this._user.password = '';
        this._user.sessionToken = usr.sessionToken;
        localStorage.user = JSON.stringify(this._user);
        localStorage.logged = 'true';
      }
    });
    return this.isLoggedIn();
  }
  /*
  * Le avisamos al servidor que cerramos sesion mediante peticion get
  * el servidor elimina el token guardado y cliente tambien
  * */
  public logout() {
    this.http.get(restEndpoint + '/service/logout');
    this.clearUser();
  }
  /*
  * Limpia el localstorage del navegador
  * */
  public clearUser() {
    this.loggedIn = false;
    localStorage.user = JSON.stringify(<UserInterface>{});
    localStorage.logged = 'false';
  }
/*
* Peticion post para iniciar sesion
* */
  private loginHttpRequest(usr: String, pass: String): Observable<String> {
   // return of(usertAcc_test);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/xml'
      }),
      responseType: 'text' as 'json',
      params: {'username': this.getUsername().toString(), 'password': this._user.password.toString()  }
    };
    console.log(this.getUsername().toString());
    console.log(this._user.password.toString());
    return this.http.post<String>(restEndpoint + '/service/login', this._user, httpOptions);
  }
  private authHttpRequest(token: String): Observable<RESTStatus> {
    return this.http.get(restEndpoint + '/service/auth?token=' + this._user.sessionToken, {responseType: 'text' as 'json'})
      .pipe(map(restStatus => this.parser.xmlToJson(restStatus.toString())));
  }

}
