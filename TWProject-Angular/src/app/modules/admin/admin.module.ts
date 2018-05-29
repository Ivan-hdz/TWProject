import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUsersManagerComponent} from '../../admin-users-manager/admin-users-manager.component';
import {AppModule} from '../../app.module';
import {SharedModule} from '../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule
  ],
  declarations: [AdminUsersManagerComponent],
  providers: []
})
export class AdminModule { }
