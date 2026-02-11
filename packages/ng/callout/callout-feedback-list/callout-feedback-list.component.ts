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

	/**
	 * Which palette should be used for the entire feedback list callout.
	 * Defaults to none (inherits parent palette)
	 */
	readonly palette = input<Palette>();

	/**
	 * Which size should the feedback list callout be? Defaults to medium
	 */
	readonly size = input<'M' | 'S'>();

	constructor() {
		ɵeffectWithDeps([this.palette, this.size], (palette, size) => this.#luClass.setState({ [`palette-${palette}`]: !!palette, [`mod-${size}`]: !!size }));
	}
}
