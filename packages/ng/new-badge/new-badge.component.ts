import { Component, Input } from '@angular/core';

@Component({
	selector: 'lu-new-badge',
	standalone: true,
	templateUrl: './new-badge.component.html',
	styleUrls: ['./new-badge.component.scss'],
})
export class NewBadgeComponent {
	@Input({ required: true })
	label: string;
}
