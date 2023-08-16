import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lu-inline-message',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './inline-message.component.html',
	styleUrls: ['./inline-message.component.scss']
})
export class InlineMessageComponent {
	@Input({ required: true })
	label: string;

	@Input()
	state: 'success' | 'warning' | 'error' | 'default' = 'default';

	@Input()
	size: 'S' | 'M' = 'M';
}
