import { ChangeDetectionStrategy, Component, inject, Input, OnChanges } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { InlineMessageState } from './inline-message-state';

@Component({
	selector: 'lu-inline-message',
	standalone: true,
	imports: [NgIf],
	hostDirectives: [NgClass],
	templateUrl: './inline-message.component.html',
	styleUrls: ['./inline-message.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineMessageComponent implements OnChanges {
	#ngClass = inject(NgClass);

	@Input({ required: true })
	label: string;

	@Input()
	state: InlineMessageState = 'default';

	@Input()
	size: 'S' | 'M' = 'M';

	ngOnChanges(): void {
		this.#ngClass.ngClass = {
			[`mod-${this.size}`]: true,
			[`is-${this.state}`]: true,
			inlineMessage: true,
		};
	}
}
