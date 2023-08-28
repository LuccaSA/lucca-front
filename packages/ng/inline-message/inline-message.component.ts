import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
	selector: 'lu-inline-message',
	standalone: true,
	imports: [NgIf],
	templateUrl: './inline-message.component.html',
	styleUrls: ['./inline-message.component.scss'],
})
export class InlineMessageComponent {
	@Input({ required: true })
	label: string;

	@Input()
	state: 'success' | 'warning' | 'error' | 'default' = 'default';

	@Input()
	size: 'S' | 'M' = 'M';
}
