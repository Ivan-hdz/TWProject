import {Injectable} from '@angular/core';
import {UserInterface, UsersInterface, RESTStatus} from '../interfaces';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {ParseFormatService} from './parse-format.service';
import {restEndpoint} from '../shared/values/strings';

@Injectable()
export class UserAccountService {

  private http: HttpClient;
  private parser: ParseFormatService;
  private  headers: HttpHeaders;

  constructor(http: HttpClient, parser: ParseFormatService) {
    this.http = http;
    this.parser = parser;
  }

  // GET METHOD
  public getUsers(): Observable<UsersInterface> {
      return this.getUsersHttpRequest().pipe(map(data => this.parser.xmlToJson(data)));
  }
// Obtenemos los usuarios registrados
  private getUsersHttpRequest(): Observable<String> {
    // return of(userSacc_test);
    return this.http.get<String>(restEndpoint + '/rest/users', {responseType: 'text' as 'json'});
  }
  // Obtenemos un usuario en especifico
  public getUser(username: String): Observable<UserInterface> {
    return this.getUserHttpRequest(username).pipe(map(data => data = this.parser.xmlToJson(data)));
  }

  private getUserHttpRequest(username: String): Observable<String> {
    // return of(usertAcc_test);
     return this.http.get<String>(restEndpoint + '/rest/users/' + username, {responseType: 'text' as 'json'});
  }
  // POST
  public postUser(user: UserInterface): Observable<RESTStatus> {
    return this.postUserHttpRequest(user).pipe(map(data => data = this.parser.xmlToJson(data)));
  }
  // Creamos un usuario nuevo enviando los datos del nuevo usuario mediante POST
  private postUserHttpRequest(newUser: UserInterface): Observable<String> {
    // return of(restStatus_test);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/xml; charset=UTF-8'
      }),
      responseType: 'text' as 'json',
      params: {'user': JSON.stringify(this.cleanObject(newUser))}
    };
     return this.http.post<String>(restEndpoint + '/rest/users', null, httpOptions);
  }
  // PUT
  public putUser(user: UserInterface): Observable<RESTStatus> {
    return this.putUserHttpMethod(user).pipe(map(data => data = this.parser.xmlToJson(data)));
  }
// Modificamos datos de un usuario existente
  private putUserHttpMethod(user: UserInterface): Observable<String> {
    // return of(restStatus_test);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/xml; charset=UTF-8'
      }),
      responseType: 'text' as 'json',
      params: {'user': JSON.stringify(user)}
    };
    console.log(user.nickname);
    return this.http.put<String>(restEndpoint + '/rest/users', null, httpOptions);
  }
  // DELETE
  public deleteUser(user: UserInterface): Observable<RESTStatus> {
    return this.deleteUserHttpMethod(user).pipe(map(data => data = this.parser.xmlToJson(data)));
  }
// Eliminamos un usuario existente
  private deleteUserHttpMethod(user: UserInterface): Observable<String> {
    // return of(restStatus_test);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/xml; charset=UTF-8'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.delete<String>(restEndpoint + '/rest/users/' + user.username, httpOptions);
  }
  private cleanObject(user: UserInterface) {
    return Object({username: user.username,
      nickname: user.nickname,
      password: user.password,
      authLevel: user.authLevel});
  }
}
