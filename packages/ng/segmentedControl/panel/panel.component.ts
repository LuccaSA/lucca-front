import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';

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
		'[class.is-active]': 'active()',
		'[id]': 'this.panelId',
		'[attr.aria-labelledby]': 'this.labelId',
	},
})
export class SegmentedControlPanelComponent {
	active = input(false, { transform: booleanAttribute });
	label = input<PortalContent>();

	panelId = `panel${nextId}`;
	labelId = `tab${nextId++}`;
}
