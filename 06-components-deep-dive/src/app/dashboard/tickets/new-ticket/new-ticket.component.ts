import { Component, ViewChild, ElementRef, AfterViewInit, AfterContentInit, contentChild, Output, EventEmitter, output} from '@angular/core';
import { viewChild } from '@angular/core';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-new-ticket',
    templateUrl: './new-ticket.component.html',
    styleUrl: './new-ticket.component.css',
    imports: [ButtonComponent, ControlComponent, FormsModule]
})
export class NewTicketComponent implements AfterViewInit {

    //@ViewChild('form')form?:ElementRef<HTMLFormElement>;
    private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
    enteredTitle = '';
    enteredText = '';

    // @Output() add = new EventEmitter();
    add = output<{title: string; text: string} >();

    ngOnInit() {
        // console.log('OnInit');
        // console.log(this.form().nativeElement)
        //console.log(this.form?.nativeElement)

    }

    ngAfterViewInit(): void{
        // console.log('AferViewInit');
        // console.log(this.form().nativeElement)
        //console.log(this.form?.nativeElement)
    }

    private control   = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

    ngAfterContentInit() {}

    onSubmit() {
        console.log ('title: ', this.enteredTitle);
        console.log ('ticketText: ', this.enteredText);
        this.add.emit({title:this.enteredTitle, text: this.enteredText});
        // get the native form element.  only call reset if it is not undefined
        // this.form().nativeElement.reset();
        this.enteredTitle = '';
        this.enteredText = '';
    }
}
