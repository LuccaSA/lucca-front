import { ChangeDetectionStrategy, Component, inject, Input, OnChanges } from '@angular/core';
import { NgClazz, Palette } from '@lucca-front/ng/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'ul[lu-callout-feedback-list]',
	standalone: true,
	template: '<ng-content></ng-content>',
	styleUrls: ['./callout-feedback-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'calloutFeedbackList',
	},
	hostDirectives: [NgClazz],
})
export class CalloutFeedbackListComponent implements OnChanges {
	#ngClass = inject(NgClazz);

	@Input()
	palette: Palette;

	@Input()
	size: 'M' | 'S' = 'M';

	ngOnChanges(): void {
		this.#ngClass.ngClass = [`palette-${this.palette}`, `mod-${this.size}`];
	}
}
