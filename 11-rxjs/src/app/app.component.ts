import { Component, inject, OnInit, DestroyRef, signal, effect } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);


  constructor() {
    effect(()=>{
      console.log(`Clicked Button ${this.clickCount()}`)
      });
  }

  clickCount = signal(0);

  ngOnInit(): void {
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
