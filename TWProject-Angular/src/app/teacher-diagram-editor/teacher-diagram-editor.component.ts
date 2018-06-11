import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TeacherQuizService} from '../services/teacher-quiz.service';
import {QuizInterface} from '../interfaces';


declare const $: any;
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'app-teacher-diagram-editor',
  templateUrl: './teacher-diagram-editor.component.html',
  styleUrls: ['./teacher-diagram-editor.component.css']
})
export class TeacherDiagramEditorComponent implements OnInit {
  get quiz(): QuizInterface {
    return this._quiz;
  }

  set quiz(value: QuizInterface) {
    this._quiz = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private retrParam: ActivatedRoute;
  private qMan: TeacherQuizService;
  private r: Router;
  private _quiz: QuizInterface;
  private _id: number;
  constructor(retrParam: ActivatedRoute, qMan: TeacherQuizService, router: Router) {
    this.retrParam = retrParam;
    this._id = -1;
    this.qMan = qMan;
    this.r = router;
    this._quiz = <QuizInterface>{};
  }



  ngOnInit() {
    this.loadActivityDat();
     const canvas = new fabric.Canvas('canvas');
    canvas.setWidth(window.screen.width * 0.8);
    canvas.setHeight(window.screen.height * 0.65);
    function handleDragStart(e) {
      [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
      });
      this.classList.add('img_dragging');
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Permite drop
      }
      e.dataTransfer.dropEffect = 'copy';
      return false;
    }

    function handleDragEnter(e) {
      // Elemento que entra al cabvas
      this.classList.add('over');
    }

    function handleDragLeave(e) {
      this.classList.remove('over'); // Elemento anterior
    }

    function handleDrop(e) {
      // Elemento actual
      if (e.stopPropagation) {
        e.stopPropagation(); // Detiene redireccionamientos
      }
      // Imagenes Drag And Dróp
      const img = document.querySelector('#images img.img_dragging ');
      console.log('event: ', e);
      const buf = new Image();
      buf.src = img.getAttribute('src');
      const newImage = new fabric.Image(img, {
        width: 100,
        height: 100,
        left: e.layerX,
        top: e.layerY

      });
      newImage.set({
        width: buf.naturalWidth,
        height: buf.naturalHeight,
        scaleX: 0.1,
        scaleY: 0.1,
        left: e.layerX,
        top: e.layerY,
      });
      console.log(canvas);
      canvas.add(newImage);
      return false;
    }
    function handleDragEnd(e) {
      // Deja el objeto donde el cursor
      [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
      });
    }

    // Añadimos los eventos de drag and drop a las imagenes
    const images = document.querySelectorAll('#images img');
    [].forEach.call(images, function (img) {
      img.addEventListener('dragstart', handleDragStart, false);
      img.addEventListener('dragend', handleDragEnd, false);
    });
    // Añadimos el soporte de eventos al canvas
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);

  }

  private loadActivityDat(): void {
    this.retrParam.params.subscribe(param => {
      this.qMan.getQuiz(param['id']).subscribe(q => {
        if ( q.id == null) {
          this.r.navigate(['teacher/quizzes']);
        } else {
          this.quiz = q;
        }
      });
    });
  }
}
