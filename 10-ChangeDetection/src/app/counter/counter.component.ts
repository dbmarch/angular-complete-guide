import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class CounterComponent implements OnInit {
  count = signal(0);

  ngOnInit() {
    console.log('Resetting counter to 0 after 2 seconds.');
    setTimeout(() => {
      this.count.set(0);
    }, 4000);
    
      setTimeout(() => {
        console.log('This timeout runs outside Angular zone.');
      }, 6000);
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
