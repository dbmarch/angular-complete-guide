import { Component, input} from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  
  size = input.required< {width: string; height: string}>();

  onReset() {
    // ...
  }
}
