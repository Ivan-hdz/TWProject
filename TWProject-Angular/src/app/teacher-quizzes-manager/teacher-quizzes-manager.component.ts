import { Component, OnInit } from '@angular/core';
import {MyBootstrapAlert} from '../clases';
import {TeacherQuizService} from '../services/teacher-quiz.service';
import {Observable, of} from 'rxjs';
import {QuizInterface, QuizzesInterface, UserInterface} from '../interfaces';
import {isSubstring} from '../shared/values/strings';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';
import {createSrcToOutPathMapper} from '@angular/compiler-cli/src/transformers/program';
import {Router} from '@angular/router';
declare const $: any;
/*
* Componente encargado de manejar la logica
* de altas, bajas , cambios y consultas de las actividades
* del profesor.
* Consume el servicio de teacher-quiz
* */
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
  loading: boolean;
  private router: Router;
  constructor(quizMan: TeacherQuizService, router: Router) {
    this.myAlert = new MyBootstrapAlert();
    this.quizMan = quizMan;
    this.sType = 0;
    this.myAlert.hidden = true;
    this.loading = true;
    this.router = router;
  }

  ngOnInit() {
    this.refreshUsers();
  }
  // Actualiza lista de las actividades registradas del profesor
  // Se me olvido cambiarle el nombre al metodo, es muy parecido al de
  // actualizar lista de usuarios registrados
  public refreshUsers() {
    this.loading = true;
    this.quizMan.getQuizzes().subscribe(qzs => {
      this.cacheQuizzes = qzs;
      if (qzs != null) {
        this.registdActvts$ = of(qzs.quiz);
      }
      this.loading = false;
    });
  }
  // Elimina una actividad , solo consume el servicio
  public deleteUsr(idQuiz: number) {
    this.quizMan.deleteQuiz(idQuiz).subscribe(result => {
      this.myAlert.fromRESTStatus(result);
      this.myAlert.hidden = false;
      this.refreshUsers();
    });
  }
  public edit(q: QuizInterface) {
    const buf: QuizInterface = <QuizInterface>{};
    const btn: any = $('#' + q.id + '_editBtn');
    if (btn.val() == 'Guardar') { // Si al presionar el boton tiene el texto guardar en vez de modificar usuario
      buf.title = $('#' + q.id + '_title').val();
      buf.description = $('#' + q.id + '_desc').val();
      buf.instructions = $('#' + q.id + '_inst').val();
      buf.id = $('#' + q.id + '_id').html();
      this.quizMan.putQuiz(buf).subscribe(restStatus => { // Mediante un Servicio se hace llamada rest
        console.log(restStatus);
        this.myAlert.fromRESTStatus(restStatus);
        this.myAlert.hidden = false;
        this.refreshUsers();
      });
    }
    $('#' + q.id + '_title').prop('disabled', !$('#' + q.id + '_title').prop('disabled') );
    $('#' + q.id + '_desc').prop('disabled', !$('#' + q.id + '_desc').prop('disabled') );
    $('#' + q.id + '_inst').prop('disabled', !$('#' + q.id + '_inst').prop('disabled') );
    $('#' + q.id + '_inst').prop('disabled') ? btn.val('Editar datos de actividad')  : btn.val('Guardar');
  }
  // Se piden las actividades del profesor al cargar,
  // se guardan en un arreglo y solo se busca en el arreglo
  // los que contengan el texto a buscar
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
// Crea una actividad, consumiendo el servicio
  newActivity(t: HTMLInputElement, d: HTMLInputElement, i: HTMLInputElement) {
    const q: QuizInterface = <QuizInterface>{};
    q.title = t.value;
    q.description = d.value;
    q.instructions = i.value;
    q.id = 0;
    q.canvas = '';
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
  go(uri: string) {
    this.router.navigate([uri]);
  }
}
