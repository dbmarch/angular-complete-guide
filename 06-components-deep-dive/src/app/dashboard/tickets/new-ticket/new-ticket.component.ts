import { Component, ViewChild, ElementRef, AfterViewInit, AfterContentInit, contentChild} from '@angular/core';
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
    private form = viewChild.required<ElementRef<HTMLFormElement>>('form')

    ngOnInit() {
        console.log('OnInit');
        console.log(this.form().nativeElement)
        //console.log(this.form?.nativeElement)

    }

    ngAfterViewInit(): void{
        console.log('AferViewInit');
        console.log(this.form().nativeElement)
        //console.log(this.form?.nativeElement)
    }

    private control   = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

    ngAfterContentInit() {

    }

    onSubmit(title:string, ticketText:string) {
        console.log ('title: ', title);
        console.log ('ticketText: ', ticketText);

        // get the native form element.  only call reset if it is not undefined
        this.form().nativeElement.reset();
    }
}
