import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { LU_SEGMENTEDCONTROLTABS_INSTANCE } from '../segmented-control-tabs.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control-tabs-panel',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'segmentedControl_panel',
		role: 'tabpanel',
		'[tabindex]': '0',
		'[class.is-active]': 'segmentedControlTabsRef.active() === value()',
		'[id]': 'panelId',
		'[attr.aria-labelledby]': 'labelId',
	},
})
export class SegmentedControlTabsPanelComponent<T = unknown> {
	protected segmentedControlTabsRef = inject(LU_SEGMENTEDCONTROLTABS_INSTANCE);
	readonly label = input<PortalContent>();
	readonly value = input.required<T>();

	readonly id = nextId++;

	readonly panelId = `panel${this.id}`;
	readonly labelId = `tab${this.id}`;
}
