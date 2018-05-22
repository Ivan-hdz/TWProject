import {RESTStatus} from './interfaces';

export class MyBootstrapAlert
{
  get type(): String {
    return this._type;
  }

  set type(value: String) {
    this._type = value;
  }

  get title(): String {
    return this._title;
  }

  set title(value: String) {
    this._title = value;
  }

  get body(): String {
    return this._body;
  }

  set body(value: String) {
    this._body = value;
  }

  get hidden(): Boolean {
    return this._hidden;
  }

  set hidden(value: Boolean) {
    this._hidden = value;
  }
  private _type: String;
  private _title: String;
  private _body: String;
  private _hidden: Boolean;

  public fromRESTStatus(result: RESTStatus) {
    this.title = result.title;
    this.body = result.body;
    if (result.status >= 200 && result.status < 400) {
      this.type = 'success';
    } else {
      this.type = 'danger';
    }
  }
}
export class User
{
  get nickname(): String {
    return this._nickname;
  }

  set nickname(value: String) {
    this._nickname = value;
  }

  get username(): String {
    return this._username;
  }

  set username(value: String) {
    this._username = value;
  }

  get authLevel(): Number {
    return this._authLevel;
  }

  set authLevel(value: Number) {
    this._authLevel = value;
  }

  get password(): String {
    return this._password;
  }

  set password(value: String) {
    this._password = value;
  }
  private _nickname: String;
  private _username: String;
  private _authLevel: Number;
  private _password: String;
}
