import { Component, ViewChild, ElementRef } from '@angular/core';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-ticket',
    standalone: true,
    templateUrl: './new-ticket.component.html',
    styleUrl: './new-ticket.component.css',
    imports: [ButtonComponent, ControlComponent, FormsModule]
})
export class NewTicketComponent {

    @ViewChild('form')form?:ElementRef<HTMLFormElement>;

    onSubmit(title:string, ticketText:string) {
        console.log ('title: ', title);
        console.log ('ticketText: ', ticketText);

        // get the native form element.  only call reset if it is not undefined
        this.form?.nativeElement.reset();
    }
}
