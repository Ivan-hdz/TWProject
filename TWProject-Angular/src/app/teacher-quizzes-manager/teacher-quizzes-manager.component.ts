import { Component, OnInit } from '@angular/core';
import {MyBootstrapAlert} from '../clases';

@Component({
  selector: 'app-teacher-quizzes-manager',
  templateUrl: './teacher-quizzes-manager.component.html',
  styleUrls: ['./teacher-quizzes-manager.component.css']
})
export class TeacherQuizzesManagerComponent implements OnInit {
  myAlert: MyBootstrapAlert;
  constructor() {
    this.myAlert = new MyBootstrapAlert();
  }

  ngOnInit() {
    this.myAlert.hidden = true;
  }

  search(txt: string): void {

  }

  newActivity(title: string, description: string, instruc: string) {

  }
}
