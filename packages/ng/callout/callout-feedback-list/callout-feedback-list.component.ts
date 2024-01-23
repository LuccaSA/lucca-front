import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';

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
		this.#luClass.setState([`palette-${this.palette}`, `mod-${this.size}`]);
	}
}
