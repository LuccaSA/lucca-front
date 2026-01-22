import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
