import { Component, forwardRef, inject, input, ViewEncapsulation } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { LU_SEGMENTEDCONTROL_INSTANCE, LU_SEGMENTEDCONTROLPANEL_INSTANCE } from '../segmented-control.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control-panel',
	standalone: true,
	templateUrl: './panel.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'segmentedControl_panel',
		role: 'tabpanel',
		'[tabindex]': '0',
		'[class.is-active]': 'segmentedControlRef.active === id',
		'[id]': 'this.panelId',
		'[attr.aria-labelledby]': 'this.labelId',
	},
	providers: [
		{
			provide: LU_SEGMENTEDCONTROLPANEL_INSTANCE,
			useExisting: forwardRef(() => SegmentedControlPanelComponent),
		},
	],
})
export class SegmentedControlPanelComponent {
	protected segmentedControlRef = inject(LU_SEGMENTEDCONTROL_INSTANCE);
	label = input<PortalContent>();

	id = nextId++;

	panelId = `panel${this.id}`;
	labelId = `tab${this.id}`;
}
