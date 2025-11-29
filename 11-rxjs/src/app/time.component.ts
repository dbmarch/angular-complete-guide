import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'async-observable-pipe',
  template: '<div><code>observable|async</code>: Time: {{ time | async }}</div>',
  standalone: true,
  imports: [AsyncPipe]
})
export class TimeComponent {
  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}