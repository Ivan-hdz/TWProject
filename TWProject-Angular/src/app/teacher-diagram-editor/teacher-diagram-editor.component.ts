import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TeacherQuizService} from '../services/teacher-quiz.service';
import {FileReaderEvent, QuizInterface} from '../interfaces';
declare const $: any;
import 'fabric';
import {MyBootstrapAlert} from '../clases';
declare const fabric: any;
/*
* Componente encargado de la logica del fabric y el editor de diagramas
* */
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
  private canvas: any;
  myAlert: MyBootstrapAlert;
  constructor(retrParam: ActivatedRoute, qMan: TeacherQuizService, router: Router) {
    this.retrParam = retrParam;
    this._id = -1;
    this.qMan = qMan;
    this.r = router;
    this._quiz = <QuizInterface>{};
    this.myAlert = new MyBootstrapAlert();
    this.myAlert.hidden = true;
  }



  ngOnInit() {

    this.canvas = new fabric.Canvas('canvas');
    this.loadActivityDat(this.canvas);
    this.initMyCanvas(this.canvas);

  }

  private initMyCanvas(canvas: any): void {

    // Funcion para eliminar objetos seleccionados
    function deleteObj() {
      const selectedObjects = canvas.getActiveObjects();
      for (let i = 0; i < selectedObjects.length; i++) {
        canvas.remove(selectedObjects[i]);
      }
      canvas.discardActiveObject();
      canvas.renderAll();
    }
    // Boton eliminar objetos seleccionados
    $('#deleteObj').click(() => {
      deleteObj();
    });

    // Cada vez que se da doble click
    // sobre imagen se hace una copia
    canvas.on({
      'mouse:dblclick': () => {
        if ( canvas.getActiveObject().get('type') != 'i-text') {
          const objectCloned = fabric.util.object.clone(canvas.getActiveObject());
          objectCloned.set('top', objectCloned.top + 15);
          objectCloned.set('left', objectCloned.left + 15);
          canvas.add(objectCloned);
          canvas.setActiveObject(objectCloned);
        }
      }
    });

    // Ancho y alto de canvas = ancho y alto de pantall
    canvas.setWidth(($(window).width() - 30) * 0.8);
    canvas.setHeight(($(window).height()) * 0.60);
    // Cada vez que la pantalla cambia tamaño, igual el canvas, responsive
    $(window).on('resize', function () {
      canvas.setWidth(($(window).width() - 30) * 0.8);
      canvas.setHeight(($(window).height()) * 0.60);
    });
    const images = document.querySelectorAll('#images img');
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
      const buf = new Image();
      buf.src = img.getAttribute('src');
      console.log(buf.src.indexOf('5.png'));
      if (buf.src.indexOf('clipping-text-9.png') != -1) {
          const txt = new fabric.IText('Texto', {
            fontFamily: 'Century Gothic',
            left: e.layerX,
            top: e.layerY
          });
          canvas.add(txt);
      } else {
        const newImage = new fabric.Image(img);
        newImage.set({
          width: buf.naturalWidth,
          height: buf.naturalHeight,
          scaleX: 1,
          scaleY: 1,
          left: e.layerX - (buf.naturalWidth / 2),
          top: e.layerY - (buf.naturalHeight / 2),
        });
        canvas.add(newImage);
      }

      return false;
    }
    function handleDragEnd(e) {
      // Deja el objeto donde el cursor
      [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
      });
    }

    // Añadimos los eventos de drag and drop a las imagenes
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
    // añadimos el escuchador al evento de obtener tecla para detectar una eliminacio
    window.addEventListener('keydown', (ev) => {
      const charCode = (ev.which) ? ev.which : ev.keyCode;
      if (charCode === 46) { // 46 corresponde al codigo de tecla suprimir o delete
        deleteObj();
      }
    });
    // Agregando el listener al selector de archivos
    $('#file').on('change', function (e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (f: FileReaderEvent) {

        const data = f.target.result; // Optiene la imagen codificada en base64
        const img = $('img')[0].cloneNode(true);
        // Se crea una imagen desde la informacion del archivo subida
        fabric.Image.fromURL(data,  (img) => {
          img.set({
            scaleX: 0.5,
            scaleY: 0.5,
            left: 0,
            top: 0
          });
          canvas.add(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    });
    // Serializar
    $('#btnSave').on('click', (e) => {
      this.quiz.canvas = JSON.stringify(canvas);
      this.qMan.putQuiz(this.quiz).subscribe(rest => {
        this.myAlert.fromRESTStatus(rest);
        this.myAlert.hidden = false;
      });
    });
  }



  private loadActivityDat(canvas: any): void {
    this.retrParam.params.subscribe(param => {
      this.qMan.getQuiz(param['id']).subscribe(q => {
        if ( q.id == null) {
          this.r.navigate(['teacher/quizzes']);
        } else {
          this.quiz = q;
          console.log(this.quiz.canvas[0]);
          canvas.loadFromJSON(this.quiz.canvas[0])  ;
        }
      });
    });
  }
}
