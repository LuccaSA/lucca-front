import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { InlineMessageState } from './inline-message-state';
import { NgClazz } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-inline-message',
	standalone: true,
	imports: [NgIf, IconComponent],
	hostDirectives: [NgClazz],
	templateUrl: './inline-message.component.html',
	styleUrls: ['./inline-message.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'inlineMessage',
	},
})
export class InlineMessageComponent implements OnChanges {
	#ngClass = inject(NgClazz);

	@Input({ required: true })
	label: string;

	@Input()
	state: InlineMessageState;

	@Input()
	size: 'S' | 'M';

	ngOnChanges(): void {
		this.#ngClass.ngClass = {
			[`mod-${this.size}`]: true,
			[`is-${this.state}`]: true,
		};
	}
}
