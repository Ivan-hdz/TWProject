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
