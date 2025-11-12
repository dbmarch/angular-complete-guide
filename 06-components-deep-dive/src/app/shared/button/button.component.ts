import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'button[appButton], a[appButton]',
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.css'
})
export class ButtonComponent {}
