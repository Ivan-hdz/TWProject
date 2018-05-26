import {Component, NgModule, OnInit} from '@angular/core';
import {CurrentUserService} from './services/current-user.service';
import {Router} from '@angular/router';

@Component({
  selector: '<app-redirect-if-not-logged></app-redirect-if-not-logged>',
  template: ''
})
export class RedirectComponent implements OnInit{
  private router: Router;
  private user: CurrentUserService;
  constructor(user: CurrentUserService, router: Router) {
    this.user = user;
    this.router = router;
  }
  ngOnInit() {
    if(!this.user.isLoggedIn()) {
      this.router.navigate(['/index']);
    }
  }
}

