import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { luBooleanAttribute, PortalContent } from '@lucca-front/ng/core';
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

	/**
	 * Icon displayed before the tab label
	 */
	readonly icon = input<LuccaIcon>();

	/**
	 * Hide the tab label, while keeping it in DOM for screen readers, and display it as a tooltip on hover and focus of the tab.
	 * Requires a text label, ignored otherwise.
	 */
	readonly hiddenLabel = input(false, { transform: luBooleanAttribute });

	/**
	 * Text label of a tab whose label is hidden, null otherwise
	 */
	readonly hiddenLabelText = computed(() => {
		const label = this.label();
		return this.hiddenLabel() && typeof label === 'string' ? label : null;
	});

	readonly value = input.required<T>();

	readonly id = nextId++;

	readonly panelId = `panel${this.id}`;
	readonly labelId = `tab${this.id}`;
}
