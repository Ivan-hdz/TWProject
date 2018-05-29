import {NgModule} from '@angular/core';
import {MenuComponent} from '../../menu/menu.component';
import {RedirectComponent} from '../../redirect.component';
import {CommonModule} from '@angular/common';
import {CurrentUserService} from '../../services/current-user.service';
import {RESTModule} from '../rest/rest.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AccessDeniedPageComponent} from '../../access-denied-page/access-denied-page.component';

@NgModule({
  declarations: [MenuComponent, RedirectComponent, AccessDeniedPageComponent],
  imports: [CommonModule, RESTModule, NgbModule.forRoot()],
  exports: [MenuComponent, RedirectComponent, AccessDeniedPageComponent],
  providers: [CurrentUserService]
})
export class SharedModule { }
