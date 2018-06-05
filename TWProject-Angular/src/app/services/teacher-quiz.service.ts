import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuizInterface, QuizzesInterface, RESTStatus, UserInterface, UsersInterface} from '../interfaces';
import {restEndpoint} from '../shared/values/strings';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {CurrentUserService} from './current-user.service';

@Injectable()
export class TeacherQuizService {
  private http: HttpClient;
  private cUser: CurrentUserService;
  constructor(http: HttpClient, usr: CurrentUserService) {
    this.http = http;
    this.cUser = usr;
  }
  // GET METHOD
  /*public getQuizzes(): Observable<QuizzesInterface> {
  }

  private getQuizzesHttpRequest(): Observable<String> {
  }

  public getQuiz(quizId: number): Observable<QuizInterface> {
  }

  private getQuizHttpRequest(quizId: number): Observable<String> {
  }
  // POST
  public postQuiz(q: QuizInterface): Observable<RESTStatus> {
  }

  private postQuizHttpRequest(q: QuizInterface): Observable<String> {
  }
  // PUT
  public putQuiz(q: QuizInterface): Observable<RESTStatus> {
  }

  private putQuizHttpMethod(q: QuizInterface): Observable<String> {
  }
  // DELETE
  public deleteQuiz(quizId: number): Observable<RESTStatus> {
  }

  private deleteQuizHttpMethod(quizId: number): Observable<String> {
  }*/
}
