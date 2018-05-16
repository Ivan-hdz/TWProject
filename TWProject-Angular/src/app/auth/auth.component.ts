import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

  isAuth()
  {
    return false;
  }

}
