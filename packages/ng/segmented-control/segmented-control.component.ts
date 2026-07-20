import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, model, output, ViewEncapsulation } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
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

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly touch = output<void>();

	/**
	 * Applies small size to segmented control
	 */
	readonly small = input(false, { transform: booleanAttribute });

	/**
	 * Display segmented control vertically
	 */
	readonly vertical = input(false, { transform: booleanAttribute });

	readonly id = `segmentedControl${nextId++}`;

	readonly name = input<string>(this.id);
}
