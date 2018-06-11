import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TeacherQuizzesManagerComponent} from '../../teacher-quizzes-manager/teacher-quizzes-manager.component';
import {TeacherDiagramEditorComponent} from '../../teacher-diagram-editor/teacher-diagram-editor.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule
  ],
  declarations: [
    TeacherQuizzesManagerComponent,
    TeacherDiagramEditorComponent
  ]
})
export class TeacherModule { }
