import { Component, inject, OnInit, DestroyRef, signal} from '@angular/core';
import {interval, Observable, Observer } from 'rxjs'; 
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TimeComponent } from './time.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TimeComponent, AsyncPipe]
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0});
    // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);f

  customInterval$ = new Observable<{message: string}>((subscriber)=> {
    let timesExecuted = 0;
    const id = setInterval(() => {
      if (timesExecuted > 3) {
        clearInterval(id);
        subscriber.complete();
        return; 
      }
      console.log ('Emitting new value');
      subscriber.next({message: 'New  value'});
      // subscriber.next('New  value');
      timesExecuted++;
    }, 2000);
  });
  
  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  constructor() {
    // effect(()=>{
    //   console.log(`Clicked Button ${this.clickCount()}`)
    //   });

    // to convert a signal to observable:
    // toObservable(this.clickCount).subscribe({...


  }


  ngOnInit(): void {

    this.customInterval$.subscribe({
      next: (val:any) => console.log(val),
      complete: () => console.log('Custom Interval Observable completed'),
      error: (err) => console.log('Custom Interval Observable error: ', err)
    });

    const subscription  = this.clickCount$.subscribe({
      next: (val:any) => console.log(`Clicked Button ${val} times`)
    })


    // setInterval(() => {
    //   this.interval.update(value => value + 1);
    //})
  //   const subscription = interval(1000).pipe(
  //     map(value => value * 2)
  //   ).subscribe({
  //     next: (value) => console.log('Tick value:', value )
  // } )

  // this.destroyRef.onDestroy(() => {
  //   subscription.unsubscribe();
  // });
}

onClick() {
  this.clickCount.update(value => value + 1);
}
}
