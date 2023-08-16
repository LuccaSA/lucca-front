import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lu-new-badge',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './new-badge.component.html',
	styleUrls: ['./new-badge.component.scss'],
})
export class NewBadgeComponent {
	@Input({ required: true })
	label: string;
}
