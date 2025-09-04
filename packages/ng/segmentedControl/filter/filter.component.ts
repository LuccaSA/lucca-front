import { booleanAttribute, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LU_SEGMENTEDCONTROL_INSTANCE } from '../segmented-control.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control-filter',
	standalone: true,
	templateUrl: './filter.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [ReactiveFormsModule, PortalDirective],
	host: {
		class: 'segmentedControl-item',
		role: 'listitem',
	},
})
export class SegmentedControlFilterComponent<T = unknown> {
	protected segmentedControlRef = inject(LU_SEGMENTEDCONTROL_INSTANCE);

	disabled = input(false, { transform: booleanAttribute });

	value = input.required<T>();

	id = `${this.segmentedControlRef.id}item${nextId++}`;
	name = this.segmentedControlRef.id;

	label = input<PortalContent>();

	public get formControl() {
		return this.segmentedControlRef.ngControl.control;
	}
}
