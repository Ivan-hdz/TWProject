import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuizInterface, QuizzesInterface, RESTStatus, UserInterface, UsersInterface} from '../interfaces';
import {restEndpoint} from '../shared/values/strings';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {CurrentUserService} from './current-user.service';
import {ParseFormatService} from './parse-format.service';

@Injectable()
export class TeacherQuizService {
  private http: HttpClient;
  private cUser: CurrentUserService;
  private parser: ParseFormatService;
  constructor(http: HttpClient, usr: CurrentUserService, parser: ParseFormatService) {
    this.http = http;
    this.cUser = usr;
    this.parser = parser;
  }
  // GET METHOD
  public getQuizzes(): Observable<QuizzesInterface> {
    return this.getQuizzesHttpRequest().pipe(map(data => this.parser.xmlToJson(data)));
  }
  /*
  * Peticion get para obtener las actividades de un profesor en especifico
  * en este caso el que tiene sesion iniciada
  * */
  private getQuizzesHttpRequest(): Observable<String> {
    return this.http.get<String>(restEndpoint + '/rest/quizzes/' + this.cUser.getUsername(), {responseType: 'text' as 'json'});
  }
  /*
  * Obtenemos una actividad en especifico con el id de dicha activiad
  * */
  public getQuiz(quizId: number): Observable<QuizInterface> {
    return this.getQuizHttpRequest(quizId).pipe(map(data => this.parser.xmlToJson(data)));
  }

  private getQuizHttpRequest(quizId: number): Observable<String> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/xml'
      }),
      responseType: 'text' as 'json',
    };
    return this.http.get<String>(restEndpoint + '/rest/quizzes/' + this.cUser.getUsername() + '/' + quizId, httpOptions);
  }
  // POST
  public postQuiz(q: QuizInterface): Observable<RESTStatus> {
    return this.postQuizHttpRequest(q).pipe(map(data => this.parser.xmlToJson(data)));
  }
  /*
  * Cramos una actividad nueva mandando los datos necesarios para su creacion en el servidor
  * */
  private postQuizHttpRequest(q: QuizInterface): Observable<String> {
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'text/xml'
    }),
    responseType: 'text' as 'json',
    params: {'quiz': JSON.stringify(q)}
  };
    return this.http.post<String>(restEndpoint + '/rest/quizzes/' + this.cUser.getUsername(), null, httpOptions);
  }
  // PUT
  public putQuiz(q: QuizInterface): Observable<RESTStatus> {
    return this.putQuizHttpMethod(q).pipe(map(data => this.parser.xmlToJson(data)));
  }
  /*
  * Modificamos una actividad existente
  * */
  private putQuizHttpMethod(q: QuizInterface): Observable<String> {
    const cQ = <QuizInterface>{};
    cQ.id = q.id[0];
    cQ.title = q.title[0];
    cQ.description = q.description[0];
    cQ.instructions = q.instructions[0];
    cQ.canvas = q.canvas;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/xml'
      }),
      responseType: 'text' as 'json',
      params: {'quiz': JSON.stringify(cQ)}
    };
    return this.http.put<String>(restEndpoint + '/rest/quizzes/' + this.cUser.getUsername(), null, httpOptions);
  }
  // DELETE
  public deleteQuiz(quizId: number): Observable<RESTStatus> {
    return this.deleteQuizHttpMethod(quizId).pipe(map(data => this.parser.xmlToJson(data)));
  }
  /*
  * Eliminamos con una peticion DELETE al servidor
  * */
  private deleteQuizHttpMethod(quizId: number): Observable<String> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/xml'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.delete<String>(restEndpoint + '/rest/quizzes/' + this.cUser.getUsername().toString() + '/' + quizId, httpOptions);
  }
}
