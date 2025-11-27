import { Component, signal, inject, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
})
export class CounterComponent implements OnInit {
  count = signal(0);
  private zone = inject(NgZone);

  ngOnInit() {
    setTimeout(() => {
      this.count.set(0);
    }, 2000);

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('This timeout runs outside Angular zone.');
      }, 6000);
    });
  }


  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
