import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = interval(1000).subscribe({
      next: (value) => console.log('Tick value:', value )
  } )

  this.destroyRef.onDestroy(() => {
    subscription.unsubscribe();
  });
}
}
