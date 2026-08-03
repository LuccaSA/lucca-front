import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, inject, input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LU_FILTER_BAR_INSTANCE } from '@lucca-front/ng/filter-pills';
import { injectNgControl, NoopValueAccessorDirective } from '@lucca-front/ng/forms';
import { LU_SEGMENTEDCONTROL_INSTANCE } from './segmented-control.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control',
	template: '<ng-content />',
	styleUrl: './segmented-control.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [NoopValueAccessorDirective],
	host: {
		role: 'presentation',
		class: 'segmentedControl',
		'[class.mod-S]': 'small()',
		'[class.mod-vertical]': 'vertical()',
		'[class.filterBar-segmentedControl]': '!!insideFilterBar',
	},
	providers: [
		{
			provide: LU_SEGMENTEDCONTROL_INSTANCE,
			useExisting: forwardRef(() => SegmentedControlComponent),
		},
	],
})
export class SegmentedControlComponent {
	ngControl = injectNgControl();

	readonly insideFilterBar = inject(LU_FILTER_BAR_INSTANCE, { optional: true });

	/**
	 * Applies small size to segmented control
	 */
	readonly small = input(false, { transform: booleanAttribute });

	/**
	 * Display segmented control vertically
	 */
	readonly vertical = input(false, { transform: booleanAttribute });

	readonly id = `segmentedControl${nextId++}`;
}
