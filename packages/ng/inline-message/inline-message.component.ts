import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass, PortalContent, PortalDirective, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { InlineMessageState } from './inline-message-state';

@Component({
	selector: 'lu-inline-message',
	imports: [PortalDirective, LuTooltipModule],
	providers: [LuClass],
	templateUrl: './inline-message.component.html',
	styleUrl: './inline-message.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'inlineMessage',
	},
})
export class InlineMessageComponent {
	#luClass = inject(LuClass);

	readonly label = input.required<PortalContent>();

	readonly state = input<InlineMessageState>();

	readonly size = input<'S' | 'M'>();

	readonly withTooltip = input(false, { transform: booleanAttribute });

	constructor() {
		ɵeffectWithDeps([this.size, this.state], (size, state) => {
			this.#luClass.setState({
				[`mod-${size}`]: !!size,
				[`is-${state}`]: !!state,
			});
		});
	}

	public isStringPortalContent(message: PortalContent): message is string {
		return typeof message === 'string';
	}
}
