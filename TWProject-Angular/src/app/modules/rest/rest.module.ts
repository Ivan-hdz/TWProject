import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAccountService} from '../../services/user-account.service';
import {ParseFormatService} from '../../services/parse-format.service';
import {HttpClientModule} from '@angular/common/http';
import {TeacherQuizService} from '../../services/teacher-quiz.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [UserAccountService, ParseFormatService, TeacherQuizService]
})
export class RESTModule { }
