import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette, ɵeffectWithDeps } from '@lucca-front/ng/core';

@Component({
	selector: 'ul[lu-callout-feedback-list]',
	template: '<ng-content />',
	styleUrl: './callout-feedback-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'calloutFeedbackList',
	},
	providers: [LuClass],
	encapsulation: ViewEncapsulation.None,
})
export class CalloutFeedbackListComponent {
	#luClass = inject(LuClass);

	readonly palette = input<Palette>();

	readonly size = input<'M' | 'S'>();

	constructor() {
		ɵeffectWithDeps([this.palette, this.size], (palette, size) => {
			this.#luClass.setState({ [`palette-${palette}`]: !!palette, [`mod-${size}`]: !!size });
		});
	}
}
