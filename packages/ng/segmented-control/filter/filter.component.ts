import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LU_SEGMENTEDCONTROL_INSTANCE } from '../segmented-control.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control-filter',
	templateUrl: './filter.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [ReactiveFormsModule, PortalDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'segmentedControl-item',
		role: 'listitem',
	},
})
export class SegmentedControlFilterComponent<T = unknown> {
	protected segmentedControlRef = inject(LU_SEGMENTEDCONTROL_INSTANCE);

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly value = input.required<T>();

	readonly id = `${this.segmentedControlRef.id}item${nextId++}`;
	readonly name = this.segmentedControlRef.id;

	readonly label = input<PortalContent>();

	public get formControl() {
		return this.segmentedControlRef.ngControl.control;
	}
}
