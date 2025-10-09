import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';

@Component({
	selector: 'ul[lu-callout-feedback-list]',
	standalone: true,
	template: '<ng-content />',
	styleUrl: './callout-feedback-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'calloutFeedbackList',
	},
	providers: [LuClass],
	encapsulation: ViewEncapsulation.None,
})
export class CalloutFeedbackListComponent implements OnChanges {
	#luClass = inject(LuClass);

	@Input()
	palette: Palette;

	@Input()
	size: 'M' | 'S';

	ngOnChanges(): void {
		this.#luClass.setState({ [`palette-${this.palette}`]: !!this.palette, [`mod-${this.size}`]: !!this.size });
	}
}
