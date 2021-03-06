import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import {Routes, RouterModule} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import {AdminModule} from './modules/admin/admin.module';
import {CommonModule} from '@angular/common';
import { AdminUsersManagerComponent } from './admin-users-manager/admin-users-manager.component';
import {SharedModule} from './modules/shared/shared.module';
import {TeacherQuizzesManagerComponent} from './teacher-quizzes-manager/teacher-quizzes-manager.component';
import {TeacherModule} from './modules/teacher/teacher.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeacherDiagramEditorComponent } from './teacher-diagram-editor/teacher-diagram-editor.component';


const routes: Routes = [
  { path: 'index', component: AuthComponent},
  { path: 'home', component: HomeComponent },
  { path: 'admin/users', component: AdminUsersManagerComponent},
  { path: 'teacher/quizzes', component: TeacherQuizzesManagerComponent },
  { path: 'teacher/quizzes/edit/:id', component: TeacherDiagramEditorComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignUpComponent,
    AuthComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    NgbModule,
    AdminModule,
    TeacherModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
