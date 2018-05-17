import {Injectable} from '@angular/core';
import {UserInterface, UsersInterface, RESTStatus} from './interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {ParseFormatService} from './parse-format.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private xml: String;
  private xml2: String;
  private xml4: String;

  private http: HttpClient;
  private parser: ParseFormatService;

  constructor(http: HttpClient, parser: ParseFormatService) {
    this.http = http;
    this.parser = parser;
    this.xml = '<users>\n' +
      '\t<user>\n' +
      '\t\t<username>1</username>\n' +
      '\t\t<nickname>Ivan</nickname>\n' +
      '\t\t<password>asdf</password>\n' +
      '\t\t<authLevel>Admin</authLevel>' +
      '\t</user>\n' +
      '\t<user>\n' +
      '\t\t<username>2</username>\n' +
      '\t\t<nickname>ivan2</nickname>\n' +
      '\t\t<password>1234</password>\n' +
      '\t\t<authLevel>Profe</authLevel>' +
      '\t</user>\n' +
      '</users>';
    this.xml2 = '<user><username>honte</username><nickname>ivan hdz</nickname><password>aloo</password></user>';
    this.xml4 = '<restStatus><status>200</status><message>Alo</message></restStatus>';
  }

  // GET METHOD
  public getUsers(): Observable<UsersInterface> {
      return this.getUsersHttpRequest().pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private getUsersHttpRequest() {
    return of(this.xml);
    // return this.http.get('http://localhost:8080/rest/users');
  }

  public getUser(username: String): Observable<UserInterface> {
    return this.getUserHttpRequest(username).pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private getUserHttpRequest(username: String) {
    return of(this.xml2);
    // return this.http.get('http://localhost:8080/rest/users/' + username);
  }
  // POST
  public postUser(user: UserInterface): Observable<RESTStatus> {
    return this.postUserHttpRequest(user).pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private postUserHttpRequest(newUser: UserInterface) {
    return of(this.xml4);
    // return this.http.post('http://localhost:8080/rest/users', newUser);
  }
  // PUT
  public putUser(user: UserInterface): Observable<RESTStatus> {
    return this.putUserHttpMethod(user).pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private putUserHttpMethod(user: UserInterface) {
    return of(this.xml4);
    // return this.http.put('http://localhost:8080/rest/users/' + user.username, user);
  }
  // DELETE
  public deleteUser(user: UserInterface): Observable<RESTStatus> {
    return this.deleteUserHttpMethod(user).pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private deleteUserHttpMethod(user: UserInterface) {
    return of(this.xml4);
    // return this.http.delete('http://localhost:8080/rest/users/' + user.username);
  }
}
