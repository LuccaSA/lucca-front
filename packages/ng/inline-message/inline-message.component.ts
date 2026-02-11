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

	/**
	 * The title of the inline message
	 */
	readonly label = input.required<PortalContent>();

	/**
	 * Inline message state
	 */
	readonly state = input<InlineMessageState>();

	/**
	 * Which size should the inline message be? Default, medium or small
	 */
	readonly size = input<'S' | 'M'>();

	/**
	 * Defines whether a tooltip is used in the inline message component
	 */
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
