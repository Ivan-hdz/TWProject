import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

  @Input() loading: boolean;
  ob$: Observable<string>;
  sub: Subject<string> = new Subject();
  loadingText: string;
  dots: string;
  func: any;
  constructor() {
    this.loadingText = 'Cargando';
    this.dots = '';
    this.ob$ = this.sub.asObservable();
  }
  ngOnInit() {
    this.ob$.subscribe(dot => {
      if (this.dots.length >= 7) {
        this.dots = '';
      } else {
        this.dots += dot;
      }
    });
    this.func = setInterval(() => {
      this.sub.next('.');
    }, 500);
  }
  ngOnDestroy() {
    if (this.func) {
      clearInterval(this.func);
    }
  }

}
