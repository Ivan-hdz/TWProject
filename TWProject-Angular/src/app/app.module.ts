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
import {MenuService} from './services/menu.service';
import { MenuComponent } from './menu/menu.component';
import {CurrentUserService} from './services/current-user.service';
import {ParseFormatService} from './services/parse-format.service';
import {RedirectComponent} from './redirect.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  { path: 'index', component: AuthComponent},
  { path: 'home', component: HomeComponent },
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
    HomeComponent,
    MenuComponent,
    RedirectComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    NgbModule.forRoot(),
    RESTModule,
    AdminModule
  ],
  providers: [MenuService, CurrentUserService, ParseFormatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
