import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import {Routes, RouterModule} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth/auth.component';
import {UserAccountService} from './shared/services/user-account.service';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {ParseFormatService} from './shared/services/parse-format.service';

const routes: Routes = [
  { path: 'index', component: AuthComponent},
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignUpComponent,
    AuthComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [UserAccountService, ParseFormatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
