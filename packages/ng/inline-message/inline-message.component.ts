import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, PortalContent } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { InlineMessageState } from './inline-message-state';

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
	label: PortalContent;

	@Input()
	state: InlineMessageState;

	@Input()
	size: 'S' | 'M';

	ngOnChanges(): void {
		this.#luClass.setState({
			[`mod-${this.size}`]: true,
			[`is-${this.state}`]: true,
		});
	}

	public isStringPortalContent(message: PortalContent): message is string {
		return typeof message === 'string';
	}
}
