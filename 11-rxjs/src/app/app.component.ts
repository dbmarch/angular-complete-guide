import { Component, inject, OnInit, DestroyRef, signal, effect, computed } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  interval = signal(0);
  doubleInterval = computed(() => this.interval() * 2);f

  constructor() {
    effect(()=>{
      console.log(`Clicked Button ${this.clickCount()}`)
      });
  }


  ngOnInit(): void {
    setInterval(() => {
      this.interval.update(value => value + 1);
    })
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
