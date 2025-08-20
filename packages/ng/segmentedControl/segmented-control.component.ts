import { booleanAttribute, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette } from '@lucca-front/ng/core';
import { LU_SEGMENTEDCONTROL_INSTANCE } from './segmented-control.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control',
	standalone: true,
	templateUrl: './segmented-control.component.html',
	styleUrls: ['./segmented-control.component.scss'],
	encapsulation: ViewEncapsulation.None,
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

	// TODO: detect children
	tabs = input(false, { transform: booleanAttribute });

	id = `segmentedControl${nextId++}`;

	get paletteClass() {
		return {
			[`palette-${this.palette()}`]: !!this.palette(),
		};
	}
}
