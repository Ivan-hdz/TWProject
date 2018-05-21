import {Component, NgModule} from '@angular/core';
import {CurrentUserService} from './services/current-user.service';
import {Router} from '@angular/router';

@Component({
  selector: '<app-redirect-if-not-logged></app-redirect-if-not-logged>',
  template: ''
})
export class RedirectComponent {
  constructor(user: CurrentUserService, router: Router) {
    if(!user.isLoggedIn()) {
      router.navigate(['/index']);
    }
  }
}

