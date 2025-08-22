import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, forwardRef, input, viewChildren, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette } from '@lucca-front/ng/core';
import { SegmentedControlPanelComponent } from './public-api';
import { LU_SEGMENTEDCONTROL_INSTANCE } from './segmented-control.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control',
	standalone: true,
	templateUrl: './segmented-control.component.html',
	styleUrls: ['./segmented-control.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [CommonModule],
	host: {
		role: 'presentation',
		'[class.segmentedControl]': '!tabs()',
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
	ordered = input(false, { transform: booleanAttribute });
	checklist = input(false, { transform: booleanAttribute });
	icons = input(false, { transform: booleanAttribute });
	small = input(false, { transform: booleanAttribute });
	vertical = input(false, { transform: booleanAttribute });
	defaultIcon = input<LuccaIcon>('signConfirm');
	palette = input<Palette>('none');

	panels = viewChildren(SegmentedControlPanelComponent);

	// TODO: detect children
	tabs = input(false, { transform: booleanAttribute });

	id = `segmentedControl${nextId++}`;

	// TODO: put children into array
	// protected segmentedControlPanelRef = inject(LU_SEGMENTEDCONTROLPANEL_INSTANCE);
	fakePanels = [
		{ label: 'Lorem', panelId: 'panel0', labelId: 'tab0' },
		{ label: 'Ipsum', panelId: 'panel1', labelId: 'tab1' },
		{ label: 'Dolor sit amet', panelId: 'panel2', labelId: 'tab2' },
		{ label: 'Consectetur adipisicing elit', panelId: 'panel3', labelId: 'tab3' },
	];

	//active = input<number | null>(null);
	active = 0;

	get paletteClass() {
		return {
			[`palette-${this.palette()}`]: !!this.palette(),
		};
	}

	// TODO
	moveFocus() {}

	previous() {
		if (this.active - 1 >= 0) {
			this.active--;
		} else {
			this.active = this.fakePanels.length - 1;
		}

		this.moveFocus();
	}

	next() {
		if (this.active + 1 > this.fakePanels.length - 1) {
			this.active = 0;
		} else {
			this.active++;
		}

		this.moveFocus();
	}
}
