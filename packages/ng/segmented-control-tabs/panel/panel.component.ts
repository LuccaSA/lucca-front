import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { LU_SEGMENTEDCONTROLTABS_INSTANCE } from '../segmented-control-tabs.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control-tabs-panel',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'segmentedControl_panel',
		role: 'tabpanel',
		'[tabindex]': '0',
		'[class.is-active]': 'segmentedControlTabsRef.active() === this.value()',
		'[id]': 'this.panelId',
		'[attr.aria-labelledby]': 'this.labelId',
	},
})
export class SegmentedControlTabsPanelComponent<T = unknown> {
	protected segmentedControlTabsRef = inject(LU_SEGMENTEDCONTROLTABS_INSTANCE);
	label = input<PortalContent>();
	value = input.required<T>();

	id = nextId++;

	panelId = `panel${this.id}`;
	labelId = `tab${this.id}`;
}
