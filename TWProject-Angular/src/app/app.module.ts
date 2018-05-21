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
import {RESTModule} from './modules/rest/rest.module';
import {AdminModule} from './modules/admin/admin.module';
import { MenuComponent } from './menu/menu.component';
import {CurrentUserService} from './services/current-user.service';
import {ParseFormatService} from './services/parse-format.service';
import {CommonModule} from '@angular/common';
import { AdminUsersManagerComponent } from './admin-users-manager/admin-users-manager.component';
import {SharedModule} from './modules/base/shared.module';

const routes: Routes = [
  { path: 'index', component: AuthComponent},
  { path: 'home', component: HomeComponent },
  { path: 'admin-users', component: AdminUsersManagerComponent},
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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
