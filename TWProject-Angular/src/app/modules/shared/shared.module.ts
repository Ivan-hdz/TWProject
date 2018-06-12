import {NgModule} from '@angular/core';
import {MenuComponent} from '../../menu/menu.component';
import {RedirectComponent} from '../../redirect.component';
import {CommonModule} from '@angular/common';
import {CurrentUserService} from '../../services/current-user.service';
import {RESTModule} from '../rest/rest.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AccessDeniedPageComponent} from '../../access-denied-page/access-denied-page.component';
import {
  MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import {LoadingComponent} from '../../loading/loading.component';
import {LoginComponent} from '../../login/login.component';
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  declarations: [
    MenuComponent,
    RedirectComponent,
    AccessDeniedPageComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RESTModule,
    NgbModule.forRoot(),
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    ColorPickerModule
  ],
  exports: [
    MenuComponent,
    RedirectComponent,
    AccessDeniedPageComponent,
    LoadingComponent,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    ColorPickerModule
  ],
  providers: [CurrentUserService]
})
export class SharedModule { }
