import { Component, OnInit } from '@angular/core';
import {MyBootstrapAlert} from '../clases';
import {TeacherQuizService} from '../services/teacher-quiz.service';
import {Observable, of} from 'rxjs';
import {QuizInterface, QuizzesInterface, UserInterface} from '../interfaces';
import {isSubstring} from '../shared/values/strings';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';
import {createSrcToOutPathMapper} from '@angular/compiler-cli/src/transformers/program';
declare const $: any;
@Component({
  selector: 'app-teacher-quizzes-manager',
  templateUrl: './teacher-quizzes-manager.component.html',
  styleUrls: ['./teacher-quizzes-manager.component.css']
})
export class TeacherQuizzesManagerComponent implements OnInit {
  myAlert: MyBootstrapAlert;
  quizMan: TeacherQuizService;
  sType: Number;
  cacheQuizzes: QuizzesInterface;
  registdActvts$: Observable<QuizInterface[]>;
  constructor(quizMan: TeacherQuizService) {
    this.myAlert = new MyBootstrapAlert();
    this.quizMan = quizMan;
    this.sType = 0;
    this.myAlert.hidden = true;
  }

  ngOnInit() {
    this.refreshUsers();
  }
  public refreshUsers() {
    this.quizMan.getQuizzes().subscribe(qzs => {
      this.cacheQuizzes = qzs;
      if (qzs != null) {
        this.registdActvts$ = of(qzs.quiz);
      }
    });
  }
  public deleteUsr(idQuiz: number) {
    this.quizMan.deleteQuiz(idQuiz).subscribe(result => {
      this.myAlert.fromRESTStatus(result);
      this.myAlert.hidden = false;
      this.refreshUsers();
    });
  }
  public edit(q: QuizInterface) {
    const buf: QuizInterface = <QuizInterface>{};
    const btn: HTMLButtonElement = $('#' + q.id + '_editBtn');
    if (btn.value === 'Guardar') { // Si al presionar el boton tiene el texto guardar en vez de modificar usuario
      buf.title = $('#' + q.id + '_title').val();
      buf.description = $('#' + q.id + '_desc').val();
      buf.instructions = $('#' + q.id + '_inst').val();
      this.quizMan.putQuiz(buf).subscribe(restStatus => { // Mediante un Servicio se hace llamada rest
        this.myAlert.fromRESTStatus(restStatus);
        this.myAlert.hidden = false;
        this.refreshUsers();
      });
    }
    $('#' + q.id + '_title').disabled = !$('#' + q.id + 'title').disabled;
    $('#' + q.id + 'desc').disabled = !$('#' + q.id + 'desc').disabled;
    $('#' + q.id + '_inst').disabled = !$('#' + q.id + '_inst').disabled;
    $('#' + q.id + '_inst').disabled ? btn.value = 'Modificar usuario' : btn.value = 'Guardar';
  }
  public search(txt: String) {
    const arr: QuizInterface[] = new Array<QuizInterface>();
    this.cacheQuizzes.quiz.forEach(q => {
      if (isSubstring(q.id.toString(), txt.toString()) && this.sType === 0) {
        arr.push(q);
      }
      if (q.title.indexOf( txt.toString() ) >= 0 && this.sType === 1) {
        arr.push(q);
      }
    });
    this.registdActvts$ = of(arr);
  }

  newActivity(t: HTMLInputElement, d: HTMLInputElement, i: HTMLInputElement) {
    const q: QuizInterface = <QuizInterface>{};
    q.title = t.value;
    q.description = d.value;
    q.instructions = i.value;
    q.id = 0;
    q.urlBody = '';
    this.quizMan.postQuiz(q).subscribe(restStatus => {
      this.myAlert.fromRESTStatus(restStatus);
      this.myAlert.hidden = false;
      if (this.myAlert.type === 'success') {
        t.value = '';
        d.value = '';
        i.value = '';
      }
      this.refreshUsers();
    });
    return false;
  }
}
