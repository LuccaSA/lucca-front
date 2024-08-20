import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { InlineMessageState } from './inline-message-state';
import { LuClass } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-inline-message',
	standalone: true,
	imports: [NgIf, IconComponent],
	providers: [LuClass],
	templateUrl: './inline-message.component.html',
	styleUrls: ['./inline-message.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'inlineMessage',
	},
})
export class InlineMessageComponent implements OnChanges {
	#luClass = inject(LuClass);

	@Input({ required: true })
	label: string;

	@Input()
	state: InlineMessageState;

	@Input()
	size: 'S' | 'M';

	ngOnChanges(): void {
		this.#luClass.setState({
			[`mod-${this.size}`]: !!this.size,
			[`is-${this.state}`]: !!this.state,
		});
	}
}
