import { booleanAttribute, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { LU_SEGMENTEDCONTROL_INSTANCE } from '../segmented-control.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control-filter',
	standalone: true,
	templateUrl: './filter.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'segmentedControl-item',
		role: 'listitem',
	},
})
export class SegmentedControlFilterComponent {
	protected segmentedControlRef = inject(LU_SEGMENTEDCONTROL_INSTANCE);

	checked = input(false, { transform: booleanAttribute });
	disabled = input(false, { transform: booleanAttribute });

	id = `${this.segmentedControlRef.id}item${nextId++}`;

	label = input<PortalContent>();
}
