import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LU_SEGMENTEDCONTROL_INSTANCE } from '../segmented-control.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control-filter',
	templateUrl: './filter.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'segmentedControl-item',
		role: 'listitem',
	},
})
export class SegmentedControlFilterComponent<T = unknown> {
	protected segmentedControlRef = inject(LU_SEGMENTEDCONTROL_INSTANCE);

	/**
	 * Disabled the segmented control filter
	 */
	readonly disabled = input(false, { transform: booleanAttribute });

	/**
	 * Defines filtered value used
	 */
	readonly value = input.required<T>();

	/**
	 * Changes the text displayed by the segmented control filter
	 */
	readonly label = input<PortalContent>();

	readonly id = `${this.segmentedControlRef.id}item${nextId++}`;

	protected readonly checked = computed(() => this.segmentedControlRef.value() === this.value());
	protected readonly isDisabled = computed(() => this.segmentedControlRef.disabled() || this.disabled());

	protected onChange() {
		this.segmentedControlRef.value.set(this.value());
	}

	protected onBlur() {
		this.segmentedControlRef.touch.emit();
	}
}
