import {Component, Input, OnInit} from '@angular/core';
import {CurrentUserService} from '../services/current-user.service';

@ Component({
  selector: 'app-access-denied-page',
  templateUrl: './access-denied-page.component.html',
  styleUrls: ['./access-denied-page.component.css']
})
export class AccessDeniedPageComponent implements OnInit {

  public authLevel: Number;
  @Input() authLevelRequired: Number;
  constructor(cU: CurrentUserService) {
    this.authLevel = cU.getAuthLevel();
  }

  ngOnInit() {
  }

}
