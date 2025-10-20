import { NgIf } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { InlineMessageState } from './inline-message-state';

@Component({
	selector: 'lu-inline-message',
	imports: [NgIf, PortalDirective, LuTooltipModule],
	providers: [LuClass],
	templateUrl: './inline-message.component.html',
	styleUrl: './inline-message.component.scss',
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

	@Input({ transform: booleanAttribute })
	withTooltip = false;

	ngOnChanges(): void {
		this.#luClass.setState({
			[`mod-${this.size}`]: !!this.size,
			[`is-${this.state}`]: !!this.state,
		});
	}

	public isStringPortalContent(message: PortalContent): message is string {
		return typeof message === 'string';
	}
}
