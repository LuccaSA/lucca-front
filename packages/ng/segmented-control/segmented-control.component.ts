import { ChangeDetectionStrategy, Component, forwardRef, inject, input, model, output, ViewEncapsulation } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { LU_FILTER_BAR_INSTANCE } from '@lucca-front/ng/filter-pills';
import { LU_SEGMENTEDCONTROL_INSTANCE } from './segmented-control.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control',
	template: '<ng-content />',
	styleUrl: './segmented-control.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
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
export class SegmentedControlComponent<T = unknown> implements FormValueControl<T | null> {
	readonly value = model<T | null>(null);

	readonly disabled = input(false, { transform: luBooleanAttribute });

	readonly touch = output<void>();

	readonly insideFilterBar = inject(LU_FILTER_BAR_INSTANCE, { optional: true });

	/**
	 * Applies small size to segmented control
	 */
	readonly small = input(false, { transform: luBooleanAttribute });

	/**
	 * Display segmented control vertically
	 */
	readonly vertical = input(false, { transform: luBooleanAttribute });

	readonly id = `segmentedControl${nextId++}`;

	readonly name = input<string>(this.id);
}
