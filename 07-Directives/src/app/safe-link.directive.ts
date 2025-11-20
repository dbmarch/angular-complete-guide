import {Directive, inject, input} from '@angular/core'
import {ElementRef} from '@angular/core'
import { LogDirective } from './log.directive';

@Directive({
   selector: 'a[appSafeLink]',
   standalone: true,
   host: {
      '(click)' : 'onConfirmLeavePage($event)'
   },
   hostDirectives: [LogDirective]
})
export class SafeLinkDirective {
queryParam = input('myApp');
private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

constructor() {
   console.log('SafeLinkDirective is active')
}

onConfirmLeavePage(event: MouseEvent) {
   // console.log ('onConfirmLeavePage', event)
   const wantsToLeave = window.confirm('Do you want to leave the app?');
   if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      //const address = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href = address + '?from='+ this.queryParam()
      return;
   } 
   event.preventDefault();
}

}