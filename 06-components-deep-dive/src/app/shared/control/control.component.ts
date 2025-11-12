import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  ViewEncapsulation,
  inject,
  input,
  ContentChild,
  contentChild,
  afterEveryRender,
  afterNextRender,
} from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-control',
    imports: [],
    templateUrl: './control.component.html',
    styleUrl: './control.component.css',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'control',
        '(click)': 'onClick()',
    }
})
export class ControlComponent {
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() {
  //   console.log('Clicked!');
  // }
  label = input.required<string>();
  private el = inject(ElementRef);
  // @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
    private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    console.log ("control constructor")
    // afterEveryRender(() => {
    //   console.log('afterEveryRender')
    // })
    // afterNextRender(()=>{
    //   console.log('afterNextRender');
    // });
  }

  onClick() {
    // console.log('Clicked!');
    // console.log(this.el);
    console.log (this.control());
  }
}
