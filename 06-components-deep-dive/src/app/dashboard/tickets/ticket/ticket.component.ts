import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model'

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  //ticket = input.required<Ticket>(null, {alias: 'data'});
  //data = input.required<Ticket>({transform: (value:Ticket) => value});
  data = input.required<Ticket>();
  detailsVisible = signal(false);
  close = output();

  onToggleDetails() {
    console.log('onToggleDetails')
    //this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update((wasVisible) => !wasVisible);
  }

  markAsComplete() {
    console.log('markAsComplete()')
    this.close.emit();
  }

}
