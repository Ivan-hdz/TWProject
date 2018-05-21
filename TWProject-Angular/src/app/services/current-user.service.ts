import { Injectable } from '@angular/core';
import {UserInterface} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {usertAcc_test} from '../shared/values/strings';
import {ParseFormatService} from './parse-format.service';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class CurrentUserService {
  private loggedIn: Boolean;
  private _user: UserInterface;
  private http: HttpClient;
  private parser: ParseFormatService;

  constructor( ht: HttpClient, parser: ParseFormatService) {
    this.loggedIn = false;
    this.http = ht;
    this.parser = parser;
    if (localStorage.user) {
      this._user = JSON.parse(localStorage.user);
    }
    if (localStorage.logged) {
      this.loggedIn = JSON.parse(localStorage.logged);
    }
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

  public getAuthLevel() {
    return this._user.authLevel;
  }

  public isLoggedIn() {
    return this.loggedIn;
  }

  public login(): Boolean {
    // Aqui mando un request de login y me devuelve el authLevel
    this.loginHttpRequest().pipe(map(usrXML => usrXML = this.parser.xmlToJson(usrXML))).subscribe(usr => {
      if(usr.username != 'error')
      {
        this.loggedIn = true;
        this._user.authLevel = usr.authLevel;
        this._user.nickname = usr.nickname;
        this._user.username = usr.username;
        this._user.password = '';
        localStorage.user = JSON.stringify(this._user);
        localStorage.logged = 'true';
      } else {
        this.clearUser();
      }
    });
    return this.isLoggedIn();
  }

  public logout() {
    this.clearUser();
    this.loggedIn = false;
    localStorage.logged = 'false';
  }

  public clearUser() {
    this._user = <UserInterface>{};
    localStorage.user = JSON.stringify(this._user);
  }

  private loginHttpRequest() {
   return of(usertAcc_test);
    // return this.http.post(restEndpoint + '/rest/login', this._user)
  }
}
