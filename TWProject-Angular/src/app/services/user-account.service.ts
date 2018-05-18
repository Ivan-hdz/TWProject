import {Injectable} from '@angular/core';
import {UserInterface, UsersInterface, RESTStatus} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {ParseFormatService} from './parse-format.service';
import {restStatus_test, userSacc_test, usertAcc_test} from '../shared/values/strings';

@Injectable()
export class UserAccountService {

  private http: HttpClient;
  private parser: ParseFormatService;

  constructor(http: HttpClient, parser: ParseFormatService) {
    this.http = http;
    this.parser = parser;

  }

  // GET METHOD
  public getUsers(): Observable<UsersInterface> {
      return this.getUsersHttpRequest().pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private getUsersHttpRequest() {
    return of(userSacc_test);
    // return this.http.get('http://localhost:8080/rest/users');
  }

  public getUser(username: String): Observable<UserInterface> {
    return this.getUserHttpRequest(username).pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private getUserHttpRequest(username: String) {
    return of(usertAcc_test);
    // return this.http.get('http://localhost:8080/rest/users/' + username);
  }
  // POST
  public postUser(user: UserInterface): Observable<RESTStatus> {
    return this.postUserHttpRequest(user).pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private postUserHttpRequest(newUser: UserInterface) {
    return of(restStatus_test);
    // return this.http.post('http://localhost:8080/rest/users', newUser);
  }
  // PUT
  public putUser(user: UserInterface): Observable<RESTStatus> {
    return this.putUserHttpMethod(user).pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private putUserHttpMethod(user: UserInterface) {
    return of(restStatus_test);
    // return this.http.put('http://localhost:8080/rest/users/' + user.username, user);
  }
  // DELETE
  public deleteUser(user: UserInterface): Observable<RESTStatus> {
    return this.deleteUserHttpMethod(user).pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private deleteUserHttpMethod(user: UserInterface) {
    return of(restStatus_test);
    // return this.http.delete('http://localhost:8080/rest/users/' + user.username);
  }
}
